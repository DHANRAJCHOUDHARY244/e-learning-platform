const { Login, Register } = require('../../../validations/auth/authValidation');

class AuthValidationMiddleware {
    loginValidation(req, res, next) {
        const { value, error } = Login(req.body);
        if (err) return next(error)
        req.body = value
    }

    registerValidation(req, res, next) {
        const { value, error } = Register(req.body);
        if (err) return next(error)
        req.body = value
    }
}