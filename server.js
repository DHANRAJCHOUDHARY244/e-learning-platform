const express=require('express')
const morgan=require('morgan')
const bodyParser=require('body-parser')
require('dotenv').config()
const cors=require('cors')
const logger = require('./utils/pino')
const { startingFun } = require('./utils/startingFun')


const app=express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))


app.listen(process.env.PORT,()=>{
    startingFun()
    logger.info(`server running on port ${process.env.PORT}`)
})