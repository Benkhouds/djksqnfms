const express = require("express");
const signUpValidation = require("../middlewere/validation");
const { signUp, signIn, getAccessToken } = require("../controllers/user");
const authMiddleware = require("../middlewere/auth");
const router = express.Router();

router.post("/sign-up", signUpValidation, signUp);

router.post("/sign-in", signIn);
router.post("/refresh-token", getAccessToken);
router.get("/me", authMiddleware, (req, res) => {
	res.send(req.user);
});
module.exports = router;
