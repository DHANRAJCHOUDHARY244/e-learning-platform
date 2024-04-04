const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const logger = require('./utils/pino')
const { startingFun } = require('./utils/startingFun')
const { dbConnect } = require('./config/database')
const { createTables } = require('./models/create_talbles')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())

dbConnect()
createTables()
app.listen(process.env.PORT, () => {
    startingFun()
    logger.info(`server running on port ${process.env.PORT}`)
}) 