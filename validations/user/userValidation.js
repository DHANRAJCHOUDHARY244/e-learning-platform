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

}

module.exports = new UserValidation()