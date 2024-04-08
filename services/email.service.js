const { registrationContent, courseEnrollmentContent, forgetPasswordContent, resetPasswordContent } = require('../templates/contentEmail')

const emailTemplate = require('../templates/emailTemplate').emailTemplate
const sendEmail = require('../utils/email').sendEmailNodemailer;
const logger = require('../utils/pino');

const sendEmailRegistration = async (email) => {
    try {
        const template = await emailTemplate(await registrationContent(email));
        const resp =await sendEmail(email, 'Enrolled new course', template);
        logger.info(JSON.stringify(resp));
        return { ...resp };
    } catch (error) {
        logger.error(`${error}`)
        throw new Error(`'Internal Server Error!😞'+ ${error}`)
    }
}

const sendEmailCourseEnrollment = async (email, course_name) => {
    try {
        const template = await emailTemplate(await courseEnrollmentContent(email, course_name));
        const resp = await sendEmail(email, 'Enrolled new course', template);
        logger.info(JSON.stringify(resp));
        return { ...resp };
    } catch (error) {
        logger.error(`${error}`)
        throw new Error(`'Internal Server Error!😞'+ ${error}`)
    }
}

const sendEmailForgetPassword = async (email, otp) => {
    try {
        const template = await emailTemplate(await forgetPasswordContent(email, otp));
        const resp = await sendEmail(email, 'Forgot password otp', template);
        logger.info(JSON.stringify(resp));
        return { ...resp };
    } catch (error) {
        logger.error(`${error}`);
        throw new Error(`Internal Server Error! 😞 ${error}`);
    }
};


const sendEmailResetPassword = async (email, otp) => {
    try {
        const template = await emailTemplate(await resetPasswordContent(email, otp));
        const resp = await sendEmail(email, 'Forgot password otp', template);
        logger.info(JSON.stringify(resp));
        return { ...resp }
    } catch (error) {
        logger.error(`${error}`)
        throw new Error(`'Internal Server Error!😞'+ ${error}`)
    }
}


module.exports = {
    sendEmailRegistration,
    sendEmailCourseEnrollment,
    sendEmailForgetPassword,
    sendEmailResetPassword
}