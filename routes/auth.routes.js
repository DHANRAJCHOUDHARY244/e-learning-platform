const { login, register, forgetPassword, verifyOtpUpdatePassword } = require('../controllers/auth.controller');
const { LoginValidation, RegisterValidation, ForgetPasswordValidation, VerifyOtpUpdatePasswordValidation } = require('../middlewares/validations/auth/authValidation');

const router = require('express').Router();

router.post('/login', LoginValidation, login)
router.post('/reg', RegisterValidation, register)
router.post('/forget-password', ForgetPasswordValidation, forgetPassword)
router.put('/verify-otp-update', VerifyOtpUpdatePasswordValidation, verifyOtpUpdatePassword)

module.exports = router