const { resource_not_found } = require('../config/constants');
const { sendError } = require('../services/generalHelper.service');
const express = require('express')

const app = express();



app.prefix('/api/auth', (router) => {
    const authRoute = require('./auth.routes');
    router.use('/', authRoute)
})

app.prefix('/api/user', (router) => {
    const userRoute = require('./user.routes');
    router.use('/', userRoute)
})

app.prefix('/api/course', (router) => {
    const courseRoute = require('./course.routes');
    router.use('/', courseRoute)
})

app.prefix('/api/enrollment', (router) => {
    const enrollmentRoute = require('./enrollment.routes');
    router.use('/', enrollmentRoute)
})

app.use((req, res, next) => {
    sendError(res, resource_not_found, 'Resource Not Found')
})


module.exports = app