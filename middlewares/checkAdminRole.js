const { forbidden_code, server_error_code } = require("../config/constants")
const { sendError } = require("../services/generalHelper.service")
const logger = require("../utils/pino");
module.exports = async function (req, res, next) {
    try {
        const user = req.user
        if (!user.role.includes('superAdmin')) return sendError(res, forbidden_code, "You are not eligible to access this route!😞")
        else if (!user.role.includes('superAdmin')) next()
    } catch (error) {
        logger.error('Internal Server Error!😞' + error)
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}