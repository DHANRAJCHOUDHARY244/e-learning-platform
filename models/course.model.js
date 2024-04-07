const query = require('../config/database').query;
const logger = require('../utils/pino');

async function createCourse(courseData) {
    const keys = Object.keys(courseData);
    const values = Object.values(courseData);

    try {
        const sql = `INSERT INTO courses (${keys.join(', ')}) VALUES (${keys.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`;
        return (await query(sql, values)).rows[0];
    } catch (err) {
        logger.error('createCourse model/course  Error inserting course: ' + err);
        throw new Error('Something went wrong!🙁 Failed to create course');
    }
}


async function getAllCourses() {
    try {
        return (await query(`SELECT * FROM courses;`)).rows;
    } catch (err) {
        logger.error('getAllCourses model/course  Error getting all courses: ' + err);
        throw new Error('Something went wrong!🙁 Error getting all courses:');
    }
}

async function getCourseById(id) {
    try {
        const sql = `
        SELECT c.id, c.name, c.duration, c.rating, c.description, c.category, c.instructor_id,
         u.first_name as instructor_first_name,u.last_name as instructor_last_name, u.email as instructor_email, c.language, c.tag, c.created_at,
        (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) AS enrolled_students_count
         FROM courses c
         JOIN users u ON c.instructor_id = u.id
         WHERE c.id = $1;
        `
        return (await query(sql, [id])).rows[0];
    } catch (err) {
        logger.error('getCourse model/course  Error getting courses: ' + err);
        throw new Error('Something went wrong!🙁 Error getting courses:');
    }
}
async function getCourseByName(course_name) {
    try {
        const sql = `
        SELECT c.id, c.name, c.duration, c.rating, c.description, c.category, c.instructor_id,
        u.first_name as instructor_first_name,u.last_name as instructor_last_name, u.email as instructor_email, c.language, c.tag, c.created_at,
        (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) AS enrolled_students_count
         FROM courses c
         JOIN users u ON c.instructor_id = u.id
         WHERE c.name = $1;
        `
        return (await query(sql, [course_name])).rows[0];
    } catch (err) {
        logger.error('getCourse model/course  Error getting courses: ' + err);
        throw new Error('Something went wrong!🙁 Error getting courses:');
    }
}

async function getCourseByFilter(name, tags, category) {
    try {
        const sql = `
           SELECT c.id, c.name, c.duration, c.rating, c.description, c.category,
           c.instructor_id,  u.first_name as instructor_first_name,u.last_name as instructor_last_name, u.email as instructor_email, c.language, c.tag, c.created_at,
           (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) AS enrolled_students_count
           FROM courses c
           JOIN users u ON c.instructor_id = u.id
           WHERE ($1::VARCHAR IS NULL OR c.name ILIKE '%' || $1::VARCHAR || '%')
             AND ($2::TEXT[] = '{}' OR c.tag && $2::TEXT[])
             AND ($3::TEXT[] = '{}' OR c.category && $3::TEXT[]);
      `
        return (await query(sql, [name, tags, category])).rows;
    } catch (err) {
        logger.error('getCourseByFilter model/course  Error getting courses: ' + err);
        throw new Error('Something went wrong!🙁 Error getting courses:');
    }
}

async function updateCourse(id, updates) {
    try {
        const values = Object.values(updates);
        const sql = `UPDATE courses SET ${Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ')} WHERE id = $${values.length + 1} RETURNING *`;
        return (await query(sql, [...values, id])).rows[0];
    } catch (err) {
        logger.error('Error updating Course: ' + err);
        throw new Error('Something went wrong!🙁 Error getting courses:');
    }
}

async function deleteCourse(id) {
    try {
        (await query('DELETE FROM courses WHERE id = $1', [id])).rows[0];
    } catch (err) {
        logger.error('Error deleting Course: ' + err);
        throw new Error('Something went wrong!🙁 Error deleting Course:');
    }
}

module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getCourseById,
    getCourseByName,
    getCourseByFilter,
}