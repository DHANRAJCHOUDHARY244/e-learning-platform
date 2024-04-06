const { Resend } = require('resend');
const logger = require('./pino');

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);



const sendEmail = async (email, subject, templete) => {
    try {
        await resend.emails.send({
            from: process.env.RESEND_EMAIL_FROM,
            to: email,
            subject: subject,
            html: templete
        })
        const response = { message: "Email Sent SuccessFully", success: true }
        return response
    } catch (error) {
        logger.error(`${error}`)
        return { message: "Something went wrong!😞", error: error, success: false }
    }
}


module.exports = sendEmail