const { updateProfile } = require('../controllers/user.controller');
const validateRequest = require('../middlewares/validateRequest');
const { UpdateProfileValidation } = require('../middlewares/validations/user/userValidation');

const router = require('express').Router();

// update profile
router.put('/update/:id', UpdateProfileValidation, validateRequest, updateProfile)
router.delete('/delete-account/:id')
router.delete('/delete-account/:id')
module.exports = router