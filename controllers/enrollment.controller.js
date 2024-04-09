const { server_error_code, success_code, conflict_code, resource_not_found, no_content, resource_created } = require('../config/constants');
const { getCourseById } = require('../models/course.model');
const { findEnrollments, createEnrollment, findUserEnrollments, deleteEnrollment } = require('../models/enrollment.model');
const { sendEmailCourseEnrollment, sendCustomEmail } = require('../services/email.service');
const { sendError, ReS } = require('../services/generalHelper.service');

const createNewEnrollment = async (req, res) => {
    try {
        let course_id = req.params.course_id;
        const user = req.user
        if ((await findEnrollments({ user_id: user.id, course_id: course_id })).length) return sendError(res, conflict_code, 'You already enrolled in this course! 😊');
        await createEnrollment(user.id, course_id);
        const courseData=await getCourseById(course_id);
        await sendEmailCourseEnrollment(user.email,courseData.name)
        return ReS(res, resource_created, '😊Hurry! Congratulation for your new enrollment in this course!')
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

const getUserEnrolledCourses = async (req, res) => {
    try {
        const user = req.user
        const courseEnrolledData = await findUserEnrollments(user.id)
        if (!courseEnrolledData.length) return sendError(res, resource_not_found, 'No course found Empty course list Please enrolled first!😞')
        return ReS(res, success_code, '😊Courses are fetched successfully! ', { courseEnrolledData })
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}


const unEnrolled = async (req, res) => {
    try {
        const enrolled_id = req.params.enrollment_id
        const user = req.user
        const enrolledData=await (await findEnrollments({ id: enrolled_id }))[0]
        if (!enrolledData) return sendError(res, resource_not_found, 'You are not enrolled in this course!😞')
        const courseEnrolledData = await deleteEnrollment(enrolled_id)
    const courseData=getCourseById(enrolledData.course_id)    
    const content={
        header:`You are Unenrolled the ${(await courseData).name}`,
        description:"You are successfully unEnrolled in this course!. Send your feedback regarding this"
    }
    await sendCustomEmail(user.email,content,`Unenrolled Successfully course: ${(await courseData).name}`)
        return ReS(res, no_content, '😊Hurry! successfully unEnrolled this course!')
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

module.exports = {
    createNewEnrollment,
    getUserEnrolledCourses,
    unEnrolled
}