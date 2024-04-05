const { resource_not_found, forbidden_code, success_code, server_error_code, resource_created, conflict_code } = require('../config/constants');
const { getUsers, createUser } = require('../models/user.model');
const { sendError, ReS } = require('../services/generalHelper.service');
const { hashPassword, verifyPassword } = require('../services/passwordHashing.service');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = (await getUsers(email))[0];
        if (!user) return sendError(res, resource_not_found, '😞! User Not Found Please Register')
        const verifyUser = await verifyPassword(password, user.password)
        if (!verifyUser) return sendError(res, forbidden_code, 'Forbidden 😞! Please put correct email or password')
        return ReS(res, success_code, '😊Hurry! You are login Successfully!')
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

const register = async (req, res) => {
    try {
        let userData = req.body;
        if ((await getUsers(userData.email)).length) return sendError(res, conflict_code, 'User already exists! 😊')
        const passwordHash = await hashPassword(userData.password)
        userData.password = passwordHash;
        await createUser(userData)
        ReS(res, resource_created, '😊Hurry! You are registered Successfully')
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

module.exports = {
    login, register
}