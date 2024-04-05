const { login, register } = require('../controllers/auth.controller');
const { LoginValidation, RegisterValidation } = require('../middlewares/validations/auth/authValidation');

const router = require('express').Router();

router.post('/login', LoginValidation, login)
router.post('/reg', RegisterValidation, register)
router.post('/forget-password/:id',)
router.put('/verify-otp-update',)

module.exports = router