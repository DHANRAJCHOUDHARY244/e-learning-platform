const joi = require('joi')

class UserValidation {
    updateProfile(params) {
        const schema = joi.object({
            first_name: joi.string().optional(),
            last_name: joi.string().optional(),
            token: joi.string().optional()
        })
        return schema.validate(params);
    }
    verifyOtpUpdatePassword(params) {
        const schema = joi.object({
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

module.exports = new UserValidation()