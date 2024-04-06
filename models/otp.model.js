const logger = require('../utils/pino');

const query = require('../config/database').query

const deleteExpireOtps = async () => {
    try {
        return (await query('DELETE FROM otp WHERE expiration_time < NOW()')).rows
    } catch (error) {
        logger.error('deleteExpireOtps model/otp  Error deleteExpireOtps: ' + error);
    }
}

const createOtp = async (userId, otp) => {
    try {
        const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
        const sql = 'INSERT INTO otp(user_id, otp, expiration_time) VALUES($1, $2, $3) RETURNING *'
        return (await query(sql, [userId, otp, expirationTime])).rows[0]
    } catch (error) {
        logger.error('CreateOtp model/otp  Error inserting otp: ' + error);
        throw new Error('Something went wrong!🙁 Failed to create otp');
    }
};

const getOtp = async (userId) => {
    try {
        await deleteExpireOtps()
        return (await query('SELECT * FROM otp WHERE user_id = $1  AND expiration_time > NOW()',
            [userId])).rows[0]
    } catch (error) {
        logger.error('GetOtp model/otp  Error getting otp: ' + error);
        throw new Error('Something went wrong!🙁 Failed to get otp');
    }
};

const updateOtp = async (userId, otp) => {
    try {
        return (await query('UPDATE otp SET otp = $1, expiration_time = $2 WHERE user_id = $3 RETURNING *',
            [otp, new Date(Date.now() + 10 * 60 * 1000), userId])).rows[0]
    } catch (error) {
        logger.error('UpdateOtp model/otp  Errorupdate otp: ' + error);
        throw new Error('Something went wrong!🙁 Failed to update otp');
    }
};

const deleteOtp = async (userId) => {
    try {
        return (await query('DELETE FROM otp WHERE user_id = $1 RETURNING *',
            [userId])).rows[0]
    } catch (error) {
        logger.error('deleteOtp model/otp  Error delete otp: ' + error);
        throw new Error('Something went wrong!🙁 Failed to delete otp');
    }
};

module.exports = { createOtp, getOtp, updateOtp, deleteOtp };
