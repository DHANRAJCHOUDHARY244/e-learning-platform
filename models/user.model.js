const logger = require('../utils/pino');

const query = require('../config/database').query

async function createUser(userData) {
    const keys = Object.keys(userData);
    const values = Object.values(userData);

    try {
        const sql = `INSERT INTO users (${keys.join(', ')}) VALUES (${keys.map((_, index) => `$${index + 1}`).join(', ')}) RETURNING *`;
        return (await query(sql, values)).rows[0];
    } catch (err) {
        logger.error('CreateUser model/user  Error inserting user: ' + err);
        throw new Error('Something went wrong!🙁 Failed to create user');
    }
}

async function getUsers(email) {
    try {
        return (await query(`SELECT * FROM users where email=$1`, [email])).rows;
    } catch (err) {
        logger.error('getUser model/user  Error getting users: ' + err);
        throw new Error('Something went wrong!🙁 Error getting users:');
    }
}

async function updateUser(id, updates) {
    try {
        const values = Object.values(updates);
        const sql = `UPDATE users SET ${Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ')} WHERE id = $${values.length + 1} RETURNING *`;
        return (await query(sql, [...values, id])).rows[0];
    } catch (err) {
        logger.error('Error updating user: ' + err);
        throw new Error('Something went wrong!🙁 Error getting users:');
    }
}

async function deleteUser(id) {
    try {
        await query('DELETE FROM users WHERE id = $1', [id]);
    } catch (err) {
        logger.error('Error deleting user: ' + err);
        throw new Error('Something went wrong!🙁 Error deleting user:');
    }
}

module.exports = { createUser, getUsers, updateUser, deleteUser };
