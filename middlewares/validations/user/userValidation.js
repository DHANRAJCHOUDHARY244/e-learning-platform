const { updateProfile, verifyOtpUpdatePassword } = require('../../../validations/user/userValidation');

function validationMiddleware(validationFunction) {
    return (req, res, next) => {
        const { value, error } = validationFunction(req.body);
        if (error) return next(error)
        req.body = value
        next();
    };
}

exports.UpdateProfileValidation = validationMiddleware(updateProfile)
exports.VerifyOtpUpdatePasswordValidation = validationMiddleware(verifyOtpUpdatePassword)