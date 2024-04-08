const joi = require('joi')

class CourseValidation {
    createNewCourse(params) {
        const schema = joi.object({
            name: joi.string().required(),
            duration: joi.string(),
            rating: joi.number().min(0).max(5).optional(),
            description: joi.string().optional(),
            category: joi.array().items(joi.string().optional()).optional(),
            language: joi.string().optional(),
            tag: joi.array().items(joi.string().optional()).optional()
        })
        return schema.validate(params);
    }
    updatePreviousCourse(params) {
        const schema = joi.object({
            name: joi.string().optional(),
            duration: joi.string().optional(),
            rating: joi.number().min(0).max(5).optional(),
            description: joi.string().optional(),
            category: joi.array().items(joi.string().optional()).optional(),
            language: joi.string().optional(),
            tag: joi.array().items(joi.string().optional()).optional()
        })
        return schema.validate(params);
    }
    getCouresByFilters(params) {
        const schema = joi.object({
            name: joi.string().optional(),
            category: joi.array().items(joi.string().optional()).optional(),
            tag: joi.array().items(joi.string().optional()).optional()
        })
        return schema.validate(params);
    }

}

module.exports = new CourseValidation()