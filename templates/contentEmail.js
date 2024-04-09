const grettingContent = (email) => {
    return `
    <p style="line-height: 160%;"><span
    style="font-size: 20px; line-height: 32px; color: #f1c40f;"><strong>Hii Buddy
        ${email}</strong></span></p>
    <p style="line-height: 160%;"> </p>
    <p style="line-height: 160%;"><span
        style="font-size: 16px; line-height: 25.6px;"><strong>
    `
}

const registrationContent = (email) => {
    return grettingContent(email) + `<span
    style="line-height: 22.4px;">Welocme to E-learning Plateform
    Family!</span></strong ></span ></p >
    <p style="line-height: 160%;"> </p>
    <p style="line-height: 160%; text-align: left;"><span
        style="font-size: 14px; line-height: 22.4px;">You are successfully registered and
        Your account is Activated now enjoy our services. </span></p>
    <p style="line-height: 160%;"> </p>`
}

const courseEnrollmentContent = (email, course_name) => {
    return grettingContent(email) + `<p style="line-height: 160%;"><span
    style="font-size: 16px; line-height: 25.6px;"><strong><span
        style="line-height: 22.4px;">You are successfully Enrolled Course
        ${course_name} !</span></strong></span></p>
    <p style="line-height: 160%;"> </p>
    <p style="line-height: 160%;"><span
        style="font-size: 14px; line-height: 22.4px;"><span
            style="line-height: 22.4px;">Enjoy course and Explore more.</span></span></p>
    <p style="line-height: 160%;"><span
        style="font-size: 14px; line-height: 22.4px;"><span
            style="line-height: 22.4px;">Keep learning !</span></span></p>
    <p style="line-height: 160%;"> </p>
    `
}

const forgetPasswordContent = (email, otp) => {
    return grettingContent(email) + `
    <p style="line-height: 160%;"><span
    style="font-size: 16px; line-height: 25.6px;"><strong><span
        style="line-height: 22.4px;">Recover your account!  Someone request for forgot
        password.</span></strong></span></p>
    <p style="line-height: 160%;"> </p>
    <p style="line-height: 160%;"><span
        style="font-size: 14px; line-height: 22.4px;"><span
            style="line-height: 22.4px;">Your otp is <span
                style="color: #e03e2d; line-height: 22.4px;"><strong><span
                    style="font-size: 20px; line-height: 32px;">${otp}</span></strong></span>.</span></span>
    </p>
    <p style="line-height: 160%;"><span
        style="font-size: 14px; line-height: 22.4px;"><span
            style="line-height: 22.4px;">Stay Safe !</span></span></p>
    <p style="line-height: 160%;"> </p>
    `
}

const resetPasswordContent = (email, otp) => {
    return grettingContent(email) + `   <p style="line-height: 160%;"><span
    style="font-size: 16px; line-height: 25.6px;"><strong><span
        style="line-height: 22.4px;">Reset your Password! Someone request for reset
        password.</span></strong></span></p>
    <p style="line-height: 160%;"> </p>
    <p style="line-height: 160%;"><span
        style="font-size: 14px; line-height: 22.4px;"><span
            style="line-height: 22.4px;">Your otp is <span
                style="color: #e03e2d; line-height: 22.4px;"><strong><span
                    style="font-size: 20px; line-height: 32px;">${otp}</span></strong></span>.</span></span>
    </p>
    <p style="line-height: 160%;"><span
        style="font-size: 14px; line-height: 22.4px;"><span
            style="line-height: 22.4px;">Stay Safe !</span></span></p>
`
}

const customContent = (email, content) => {
    return grettingContent(email) + `<span
    style="line-height: 22.4px;"> ${content.header} </span></strong ></span ></p >
    <p style="line-height: 160%;"> </p>
    <p style="line-height: 160%; text-align: left;"><span
        style="font-size: 14px; line-height: 22.4px;">${content.description} </span></p>
    <p style="line-height: 160%;"> </p>`
}

module.exports = {
    registrationContent,
    courseEnrollmentContent,
    forgetPasswordContent,
    resetPasswordContent,
    customContent
}