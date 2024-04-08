const express = require('express')
const morgan = require('morgan')
const fileUpload = require('express-fileupload');
require('dotenv').config()
const cors = require('cors')
const logger = require('./utils/pino')
const { startingFun } = require('./utils/startingFun')
const { dbConnect } = require('./config/database')
const { createTables, createAdmin } = require('./models/create_talbles')
const { sendError } = require('./services/generalHelper.service')
const { server_error_code } = require('./config/constants')

// --------------------grouping the routes by creating method prefix-------
express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

const app = express();

// ---------- configure parsing,crossorigin and logger
app.use(fileUpload({ useTempFiles: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())

// -------------configure routes ----------------
app.use(require('./routes'))

// -------------Handle error middleware ----------------
app.use((err, req, res, next) => {
    logger.error(err.stack)
    sendError(res, server_error_code, err.stack)
})


// -------------connect database ----------------
dbConnect()

// -------------create tables ----------------
createTables()

// -------------create admin ----------------
createAdmin()

app.listen(process.env.PORT, () => {
    startingFun()
    logger.info(`server running on port ${process.env.PORT}`)
}) 