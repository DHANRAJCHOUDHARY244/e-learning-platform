const jwt = require('jsonwebtoken');
const constants = require('../config/constants')

const publicKey = require('fs').readFileSync('jwtrsa256.pub', 'utf8');

module.exports = async function (req, res, next) {
    const token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['token'];
    if (token) {
        try {
            await jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
                if (err) return res.status(constants.forbidden_code)
                    .json({
                        'status': constants.forbidden_code,
                        'message': 'Sorry! Your token seems to be expired, please request a new one.'
                    })
                req.user = decoded
            })
            next()
        } catch (error) {
            console.log('error at validaterequest', error);
            return res.status(constants.server_error_code).json({
                'status': constants.server_error_code,
                'message': 'Oops! Something went wrong.',
                'error': err
            })
        }
    }
}