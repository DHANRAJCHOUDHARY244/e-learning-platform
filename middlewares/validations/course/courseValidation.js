const { createNewCourse, updatePreviousCourse, getCouresByFilters } = require('../../../validations/course/courseValidation');

function validationMiddleware(validationFunction) {
    return (req, res, next) => {
        const { value, error } = validationFunction(req.body);
        if (error) return next(error)
        req.body = value
        next();
    };
}

exports.CreateNewCourse = validationMiddleware(createNewCourse)
exports.UpdatePreviousCourseValidation = validationMiddleware(updatePreviousCourse)
exports.GetCouresByFiltersValidation = validationMiddleware(getCouresByFilters)