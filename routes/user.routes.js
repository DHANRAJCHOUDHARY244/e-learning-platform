const { updateProfile, getUser } = require('../controllers/user.controller');
const { validateIpRateLimit } = require('../middlewares/rateLimit');
const validateRequest = require('../middlewares/validateRequest');
const { UpdateProfileValidation } = require('../middlewares/validations/user/userValidation');
const { getUsers } = require('../models/user.model');

const router = require('express').Router();

// update profile
router.put('/update/:id', UpdateProfileValidation, validateRequest, updateProfile)
router.get('/:id', getUser)
router.get('/all', validateIpRateLimit(5, 10), getUsers)
router.delete('/delete-account/:id')
module.exports = router