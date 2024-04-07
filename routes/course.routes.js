const { createNewCourse, updatePreviousCourse, getCourse, getCouresByFilters, removeCourse, getCourses } = require('../controllers/course.controller');
const { CreateNewCourse, UpdatePreviousCourseValidation, GetCouresByFiltersValidation } = require('../middlewares/validations/course/courseValidation');
const router = require('express').Router();
const validatRequest = require('../middlewares/validateRequest')

router.post('/create', validatRequest, CreateNewCourse, createNewCourse)
router.put('/update/:id', UpdatePreviousCourseValidation, updatePreviousCourse)
router.get('/all', getCourses)
router.get('/filters', GetCouresByFiltersValidation, getCouresByFilters)
router.get('/:id', getCourse)
router.delete('/remove/:id', removeCourse)

module.exports = router