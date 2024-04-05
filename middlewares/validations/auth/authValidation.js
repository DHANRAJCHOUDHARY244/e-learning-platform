const { Login, Register } = require('../../../validations/auth/authValidation');

function validationMiddleware(validationFunction) {
    return (req, res, next) => {
        const { value, error } = validationFunction(req.body);
        if (error) return next(error)
        req.body = value
        next();
    };
}

exports.LoginValidation = validationMiddleware(Login)
exports.RegisterValidation = validationMiddleware(Register)