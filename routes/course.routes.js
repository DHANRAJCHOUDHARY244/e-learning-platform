const { createNewCourse, updatePreviousCourse, getCourse, getCouresByFilters, removeCourse, getCourses } = require('../controllers/course.controller');
const { CreateNewCourse, UpdatePreviousCourseValidation, GetCouresByFiltersValidation } = require('../middlewares/validations/course/courseValidation');
const router = require('express').Router();
const validatRequest = require('../middlewares/validateRequest')
const validateAdminRouteRequest = require('../middlewares/checkAdminRole');
const { validateIpRateLimit } = require('../middlewares/rateLimit');

router.post('/create', validatRequest, validateAdminRouteRequest, CreateNewCourse, createNewCourse)
router.put('/update/:id', validatRequest, validateAdminRouteRequest, UpdatePreviousCourseValidation, updatePreviousCourse)
router.get('/all', validateIpRateLimit(30, 150), getCourses)
router.get('/filters', validateIpRateLimit(30, 150), GetCouresByFiltersValidation, getCouresByFilters)
router.get('/:id', validateIpRateLimit(30, 80), getCourse)
router.delete('/remove/:id', validatRequest, validateAdminRouteRequest, removeCourse)

module.exports = router