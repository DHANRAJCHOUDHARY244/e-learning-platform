const constants = require('../config/constants');
const { sendError } = require('./generalHelper.service');

/* Used in routes, once max api limit is hit, this will be called*/
module.exports.IPlimitReached = function (req, res) {
    try {
        const rateLimitedIP = req.connection.remoteAddress;
        return sendError(res, constants.limit_reached, `Too many requests, please try again after sometime.IP: ${rateLimitedIP}`)
    } catch (error) {
        return sendError(res, constants.server_error_code, `'Oops! Something went wrong.'`)
    }
};
