const logger = require('../utils/pino');

const query = require('../config/database').query

async function createEnrollment(user_id, course_id) {
    try {
        return (await query('INSERT INTO enrollments (user_id, course_id, status) VALUES ($1, $2, $3) RETURNING *', [user_id, course_id, 'Active'])).rows[0];
    } catch (err) {
        logger.error('createEnrollment model/enrollment  Error inserting enrollment: ' + err);
        throw new Error('Something went wrong!🙁 Failed to create enrollment');
    }
}


async function findEnrollments(criteria) {
    const keys = Object.keys(criteria);
    const values = Object.values(criteria);

    try {
        // Constructing the WHERE clause dynamically
        const whereClause = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');

        const sql = `SELECT * FROM enrollments WHERE ${whereClause}`;
        return (await query(sql, values)).rows;
    } catch (err) {
        logger.error('findEnrollments model/enrollment  Error finding enrollments: ' + err);
        throw new Error('Something went wrong!🙁 Failed to find enrollments');
    }
}

async function findUserEnrollments(user_id) {
    try {
        const sql = `SELECT c.id, c.name, c.duration, c.rating, c.description, c.category, c.instructor_id,
         u.first_name AS instructor_first_name, u.last_name AS instructor_last_name, u.email AS instructor_email, 
         c.language, c.tag, c.created_at,
        ( SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id ) AS enrolled_students_count,
       en.id as enrollment_id
    FROM
        courses c
        JOIN users u ON c.instructor_id = u.id
        JOIN enrollments en ON c.id = en.course_id
    WHERE
        en.user_id = $1;
    `;
        return (await query(sql, [user_id])).rows;
    } catch (err) {
        logger.error('findUserEnrollments model/enrollment  Error finding enrollments: ' + err);
        throw new Error('Something went wrong!🙁 Failed to find enrollments');
    }
}

async function deleteEnrollment(id) {
    try {
       return (await query('DELETE FROM enrollments WHERE id = $1', [id])).rows[0];
    } catch (err) {
        logger.error('model/enrollment Error deleting enrollments: ' + err);
        throw new Error('Something went wrong!🙁 Error deleting user:');
    }
}

module.exports = { createEnrollment, findEnrollments, deleteEnrollment,findUserEnrollments }