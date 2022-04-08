const express = require("express");
const { signUpValidation, validate } = require("../middlewere/validation");
const {
	signUp,
	signIn,
	logout,
	getAccessToken,
} = require("../controllers/user");
const authMiddleware = require("../middlewere/auth");
const refreshToken = require("../middlewere/refreshToken");
const router = express.Router();

router.post("/sign-up", signUpValidation, validate, signUp);

router.post("/sign-in", signIn);
router.post("/refresh-token", refreshToken, getAccessToken);
router.post("/logout", authMiddleware(), logout);
router.get("/me", authMiddleware(), (req, res) => {
	req.user.password = "";
	res.send(req.user);
});
module.exports = router;
