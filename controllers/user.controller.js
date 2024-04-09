const { updateUser, deleteUser, getAllUsers, getAllUsersCount, getUserById } = require('../models/user.model')
const { fileUploadGetUrl } = require('../services/cloudinary.service')
const { sendError, ReS, generateOTP } = require('../services/generalHelper.service');
const { server_error_code, resource_created, no_content, forbidden_code } = require('../config/constants');
const { sendEmailResetPassword, sendCustomEmail } = require('../services/email.service');
const { getOtp, updateOtp, deleteOtp, createOtp } = require('../models/otp.model');
const { hashPassword } = require('../services/passwordHashing.service');

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

const resetPassword = async (req, res) => {
    try {
        const user = req.user
        const otp = generateOTP()
        if ((await getOtp(user.id))) {
            const resp = await sendEmailResetPassword(user.email, otp)
            if (!resp.success) return sendError(res, server_error_code, resp.message)
            await updateOtp(user.id, otp)
        }
        else {
            const resp = await sendEmailResetPassword(user.email, otp)
            if (!resp.success) return sendError(res, server_error_code, resp.message)
            await createOtp(user.id, otp)
        }
        return ReS(res, resource_created, '😊Otp sent Successfully on your email ! Verify Otp to update Password')
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

const verifyOtpUpdatePassword = async (req, res) => {
    try {
        const {  otp, password } = req.body
        const user = req.user
        const otpData = await getOtp(user.id)
        if (!otpData) return sendError(res, forbidden_code, 'It seem like otp expired or wrong otp ! 😞')
        if (otp != otpData.otp && otpData) return sendError(res, forbidden_code, 'It seem like otp expired or wrong otp ! 😞')
        else if (otp == otpData.otp) {
            const passwordHash = await hashPassword(password)
            await updateUser(user.id, { password: passwordHash })
            await deleteOtp(user.id)
            const content={
                header:`Password updated Successfully`,
                description:"You are updated password successfully ! If you are not then report this to our security intelligence!"
            }
            await sendCustomEmail(user.email,content,`Password updated Successfully`)
              
            return ReS(res, resource_created, '😊Otp verified and updated password successfully! ')
        }
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

module.exports = { updateProfile, deleteAccount, getAllUser, getUser,resetPassword,verifyOtpUpdatePassword }