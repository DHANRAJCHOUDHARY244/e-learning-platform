const { updateUser, deleteUser, getAllUsers, getAllUsersCount, getUserById } = require('../models/user.model')
const { fileUploadGetUrl } = require('../services/cloudinary.service')
const { sendError, ReS } = require('../services/generalHelper.service');
const { server_error_code, resource_created, no_content } = require('../config/constants');

const updateProfile = async (req, res) => {
    try {
        const user = req.user
        const file = req.files.image
        const userdata = req.body
        const cloudinaryImagData = await fileUploadGetUrl(file)
        if (!cloudinaryImagData.success) return sendError(res, server_error_code, cloudinaryImagData.message)
        await updateUser(user.id, { profile_img_url: cloudinaryImagData.url, ...userdata })
        return ReS(res, resource_created, '😊User profile data updated successfully! ')
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

const getAllUser = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 10;
        const offset = (page - 1) * limit;
        const userData = await getAllUsers(limit, offset);
        if (!userData.length) return sendError(res, resource_not_found, 'No user found Empty user list!😞')
        const totalUsers = (await getAllUsersCount()).total_count;
        const totalPages = Math.ceil(totalUsers / limit);
        return ReS(res, success_code, '😊Users are fetched successfully! ', { Users: userData, page: totalPages, limit: 10 })
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}
const getUser = async (req, res) => {
    try {
        const page = req.params.user_id;
        const userData = await getUserById(user_id)
        if (!userData) return sendError(res, resource_not_found, 'No user found !😞')
        return ReS(res, success_code, '😊User are fetched successfully! ', { userData })
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}
const deleteAccount = async (req, res) => {
    try {
        const user = req.user;
        await deleteUser(user.id)
        return ReS(res, no_content, '😊 User profile deleted successfully! ')
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

module.exports = { updateProfile, deleteAccount, getAllUser, getUser }