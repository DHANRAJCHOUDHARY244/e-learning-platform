const { createNewEnrollment, getUserEnrolledCourses, unEnrolled } = require('../controllers/enrollment.controller');
const validateRequest = require('../middlewares/validateRequest');

const router = require('express').Router();

router.post('/create/:course_id',validateRequest,createNewEnrollment)
router.get('/enrolled',validateRequest,getUserEnrolledCourses)
router.delete('/unenrolled/:enrollment_id',validateRequest,unEnrolled)

module.exports = router