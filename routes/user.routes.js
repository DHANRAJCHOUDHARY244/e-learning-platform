const { updateProfile, getUser, resetPassword, verifyOtpUpdatePassword } = require('../controllers/user.controller');
const { validateIpRateLimit } = require('../middlewares/rateLimit');
const validateRequest = require('../middlewares/validateRequest');
const { UpdateProfileValidation, VerifyOtpUpdatePasswordValidation } = require('../middlewares/validations/user/userValidation');
const { getUsers } = require('../models/user.model');

const router = require('express').Router();

// update profile
router.put('/update/:id', UpdateProfileValidation, validateRequest, updateProfile)
router.get('/:id', getUser)
router.get('/all', validateIpRateLimit(5, 10), getUsers)
router.delete('/delete-account/:id')
router.post('/reset-password',validateIpRateLimit(6*60, 10),validateRequest,resetPassword)
router.put('/verify-otp-update-password',VerifyOtpUpdatePasswordValidation,validateRequest,verifyOtpUpdatePassword)
module.exports = router