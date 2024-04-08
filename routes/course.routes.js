const { createNewCourse, updatePreviousCourse, getCourse, getCouresByFilters, removeCourse, getCourses } = require('../controllers/course.controller');
const { CreateNewCourse, UpdatePreviousCourseValidation, GetCouresByFiltersValidation } = require('../middlewares/validations/course/courseValidation');
const router = require('express').Router();
const validatRequest = require('../middlewares/validateRequest')
const validateAdminRouteRequest=require('../middlewares/checkAdminRole')

router.post('/create',validatRequest,validateAdminRouteRequest , CreateNewCourse, createNewCourse)
router.put('/update/:id', validatRequest,validateAdminRouteRequest ,UpdatePreviousCourseValidation, updatePreviousCourse)
router.get('/all', getCourses)
router.get('/filters', GetCouresByFiltersValidation, getCouresByFilters)
router.get('/:id', getCourse)
router.delete('/remove/:id',validatRequest,validateAdminRouteRequest , removeCourse)

module.exports = router