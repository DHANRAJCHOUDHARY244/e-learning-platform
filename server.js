const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const logger = require('./utils/pino')
const { startingFun } = require('./utils/startingFun')
const { dbConnect } = require('./config/database')
const { createTables } = require('./models/create_talbles')
const { sendError } = require('./services/generalHelper.service')
const { server_error_code } = require('./config/constants')

express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())

app.use(require('./routes'))

app.use((err, req, res, next) => {
    logger.error(err.stack)
    sendError(res, server_error_code, err.stack)
})

dbConnect()
createTables()
app.listen(process.env.PORT, () => {
    startingFun()
    logger.info(`server running on port ${process.env.PORT}`)
}) 