const { server_error_code, success_code, conflict_code, resource_not_found, no_content, resource_created } = require('../config/constants');
const { getCourseByName, createCourse, updateCourse, getAllCourses, getCourseById, getCourseByFilter } = require('../models/course.model');
const { sendError, ReS } = require('../services/generalHelper.service');

const createNewCourse = async (req, res) => {
    try {
        let courseData = req.body;
        const user = req.user
        courseData = { ...courseData, instructor_id: user.id }
        if ((await getCourseByName(courseData.name))) return sendError(res, conflict_code, 'Course already exists! 😊');
        await createCourse(courseData);
        return ReS(res, resource_created, '😊Hurry! Congratulation for your Successfully registered new course!')
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

const updatePreviousCourse = async (req, res) => {
    try {
        const course_id = req.params.id
        const courseData = req.body;
        await updateCourse(course_id, courseData);
        return ReS(res, resource_created, '😊Couse  data updated successfully! ')
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}
const getCourses = async (req, res) => {
    try {
        const courseData = await getAllCourses()
        if (!courseData.length) return sendError(res, resource_not_found, 'No course found Empty course list!😞')
        return ReS(res, success_code, '😊Courses are fetched successfully! ', { courseData })
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

const getCourse = async (req, res) => {
    try {
        const course_id = req.params.id
        const courseData = await getCourseById(course_id)
        if (!courseData) return sendError(res, resource_not_found, 'Course not found!😞')
        return ReS(res, success_code, '😊Course are fetched successfully! ', { courseData })
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

const getCouresByFilters = async (req, res) => {
    try {
        const { name, tag, category } = req.body;
        const courseData = await getCourseByFilter(name, tag, category)
        if (!courseData.length) return sendError(res, resource_not_found, 'No course found with these filters!😞')
        return ReS(res, success_code, '😊Filtered Courses are fetched successfully! ', { courseData })

    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

const removeCourse = async (req, res) => {
    try {
        const course_id = req.params.id
        if (!(await getCourseById(course_id))) sendError(res, resource_not_found, 'No course found to remove!😞')
        return ReS(res, no_content, '😊Hurry! Course is deleted successfully! ', { courseData })
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

module.exports = {
    createNewCourse,
    updatePreviousCourse,
    getCourses,
    getCourse,
    getCouresByFilters,
    removeCourse
}