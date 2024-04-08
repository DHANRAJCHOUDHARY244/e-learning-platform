const { rateLimit } = require('express-rate-limit');
const { IPlimitReached } = require('../services/ipRateLimit.service');

exports.validateIpRateLimit = (minutes, maxRequest) => {
    const time = minutes * 60 * 1000;
    const limter = {
        windowMs: time,
        max: maxRequest,
        headers: false,
        handler: IPlimitReached,
        keyGenerator: (req) => {
            return req.connection.remoteAddress;
        }
    }

    return rateLimit(limter)
}