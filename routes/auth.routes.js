const { login, register, forgetPassword, verifyOtpUpdatePassword } = require('../controllers/auth.controller');
const { validateIpRateLimit } = require('../middlewares/rateLimit');
const { LoginValidation, RegisterValidation, ForgetPasswordValidation, VerifyOtpUpdatePasswordValidation } = require('../middlewares/validations/auth/authValidation');

const router = require('express').Router();

router.post('/login', validateIpRateLimit(30, 10), LoginValidation, login)
router.post('/reg', RegisterValidation, register)
router.post('/forget-password', ForgetPasswordValidation, forgetPassword)
router.put('/verify-otp-update', validateIpRateLimit(10, 5), VerifyOtpUpdatePasswordValidation, verifyOtpUpdatePassword)

module.exports = router