const joi = require('joi')

class AuthValidation {
    Login(params) {
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required()
        })
        return schema.validate(params);
    }

    Register(params) {
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required().min(6)
                .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
                .required()
                .messages({
                    'string.base': 'Password must be a string',
                    'string.empty': 'Password cannot be empty',
                    'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
                    'string.min': 'Password must be at least 6 characters long',
                    'any.required': 'Password is required',
                }),
            first_name: joi.string().min(3).required(),
            last_name: joi.string().trim().min(3).optional()
        });
        return schema.validate(params);
    }

    ForgetPassword(params) {
        const schema = joi.object({
            email: joi.string().email().required()
        })
        return schema.validate(params);
    }


    VerifyOtpUpdatePassword(params) {
        const schema = joi.object({
            email: joi.string().email().required(),
            otp: joi.string().min(6).max(6).required(),
            password: joi.string().required().min(6)
                .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
                .required()
                .messages({
                    'string.base': 'Password must be a string',
                    'string.empty': 'Password cannot be empty',
                    'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
                    'string.min': 'Password must be at least 6 characters long',
                    'any.required': 'Password is required',
                })
        });
        return schema.validate(params);
    }

}

module.exports = new AuthValidation()