const { resource_not_found, forbidden_code, success_code, server_error_code, resource_created, conflict_code } = require('../config/constants');
const { getOtp, updateOtp, createOtp, deleteOtp } = require('../models/otp.model');
const { getUsers, createUser, updateUser } = require('../models/user.model');
const { sendEmailRegistration, sendEmailForgetPassword, sendCustomEmail } = require('../services/email.service');
const { sendError, ReS, generateOTP, generateToken } = require('../services/generalHelper.service');
const { hashPassword, verifyPassword } = require('../services/passwordHashing.service');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = (await getUsers(email));
        if (!user) return sendError(res, resource_not_found, '😞! User Not Found Please Register')
        const verifyUser = await verifyPassword(password, user.password)
        if (!verifyUser) return sendError(res, forbidden_code, 'Forbidden 😞! Please put correct email or password')
        const token = await generateToken(user)
        return ReS(res, success_code, '😊Hurry! You are login Successfully!', { token })
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

const register = async (req, res) => {
    try {
        let userData = req.body;
        if ((await getUsers(userData.email))) return sendError(res, conflict_code, 'User already exists! 😊')
        const passwordHash = await hashPassword(userData.password)
        userData.password = passwordHash;
        const user = await createUser(userData)
        const token = await generateToken(user);
        await sendEmailRegistration(userData.email)
        ReS(res, resource_created, '😊Hurry! You are registered Successfully', { token })
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

const forgetPassword = async (req, res) => {
    try {
        const email = req.body.email
        const user = await getUsers(email)
        if (!user) return sendError(res, conflict_code, 'User Not exists! Please register! 😊')
        const otp = generateOTP()
        if ((await getOtp(user.id))) {
            const resp = await sendEmailForgetPassword(email, otp)
            if (!resp.success) return sendError(res, server_error_code, resp.message)
            await updateOtp(user.id, otp)
        }
        else {
            const resp = await sendEmailForgetPassword(email, otp)
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
        const { email, otp, password } = req.body
        const userdata = await getUsers(email)
        if (!userdata) return sendError(res, conflict_code, 'User Not exists! Please register! 😊')
        const otpData = await getOtp(userdata.id)
        if (!otpData) return sendError(res, forbidden_code, 'It seem like otp expired or wrong otp ! 😞')
        if (otp != otpData.otp) return sendError(res, forbidden_code, 'It seem like otp expired or wrong otp ! 😞')
        else if (otp == otpData.otp) {
            const passwordHash = await hashPassword(password)
            await updateUser(userdata.id, { password: passwordHash })
            await deleteOtp(userdata.id)
            const content={
                header:`Password updated Successfully`,
                description:"You are updated password successfully ! If you are not then report this to our security intelligence!"
            }
            await sendCustomEmail(userdata.email,content,`Password updated Successfully`)
            return ReS(res, resource_created, '😊Otp verified and updated password successfully! ')
        }
    } catch (error) {
        return sendError(res, server_error_code, 'Internal Server Error!😞')
    }
}

module.exports = {
    login, register, forgetPassword, verifyOtpUpdatePassword
}