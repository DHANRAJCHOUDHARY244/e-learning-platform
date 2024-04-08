
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const { ReS } = require('../services/generalHelper.service');
const logger = require("../utils/pino");

module.exports = async function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['token'];
    if (token) {
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            logger.info('error at validaterequest'+error);
            return ReS(res,constants.forbidden_code,'Sorry! Your token seems to be expired, please request a new one.')
        }
    } else return ReS(res,constants.forbidden_code,'Access denied! Token is required.')
}
