const express = require('express');
const {
	signUpValidation,
	signInValidation,
	validate,
} = require('../middleware/validation');
const {
	signUp,
	signIn,
	logout,
	getAccessToken,
} = require('../controllers/user');
const authMiddleware = require('../middleware/auth');
const refreshToken = require('../middleware/refreshToken');
const router = express.Router();

router.post('/sign-up', signUpValidation, validate, signUp);

router.post('/sign-in', signInValidation, validate, signIn);
router.post('/refresh-token', refreshToken, getAccessToken);
router.post('/logout', authMiddleware(), logout);

module.exports = router;
