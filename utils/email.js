const { Resend } = require('resend');
const logger = require('./pino');
const nodemailer=require('nodemailer')

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);



const sendEmailResend = async (email, subject, templete) => {
    try {
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_EMAIL_FROM,
            to: email,
            subject: subject,
            html: templete
        })
        if (error) throw new Error(error)
        const response = { message: "Email Sent SuccessFully", success: true }
        return response
    } catch (error) {
        logger.error("Something went wrong!😞" + error)
        console.log({ error });
        return { message: "Something went wrong!😞", error: error, success: false }
    }
}

async function sendEmailNodemailer(email, subject, templete) {
    try {
        // Create a SMTP transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // true for 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_EMAIL_FROM,
                pass: process.env.NODEMAILER_EMAIL_API_KEY,
            },
        });

        const info = await transporter.sendMail({
            from:process.env.NODEMAILER_EMAIL_FROM ,
            to: email,
            subject: subject,
            html: templete,
        });

        logger.info('Email sent successfully:', info.messageId);
        const response = { message: "Email Sent SuccessFully", success: true }
        return response
    } catch (error) {
        logger.error("Something went wrong!😞" + error)
        console.log({ error });
        return { message: "Something went wrong!😞", error: error, success: false }
    }
}

module.exports = {sendEmailNodemailer,sendEmailResend}