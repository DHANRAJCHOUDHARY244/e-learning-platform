const { updateUser } = require('../models/user.model')
const { fileUploadGetUrl } = require('../services/cloudinary.service')
const { sendError, ReS } = require('../services/generalHelper.service');
const { server_error_code, resource_created } = require('../config/constants');

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

module.exports = { updateProfile }