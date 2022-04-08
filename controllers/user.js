const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BadRequest } = require("../utils/errorResponse");
exports.signUp = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = new User(req.body);
		const found = await User.findOne({ email });
		if (found) {
			throw new BadRequest("Email already exists");
		}
		const salt = 10;
		const hashedpassword = await bcrypt.hash(password, salt);
		user.password = hashedpassword;
		const payload = { _id: user._id };
		const token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
			expiresIn: "15m",
		});

		await user.save();
		const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
			expiresIn: "7j",
		});
		res.cookie("jid", refreshToken, {
			httpOnly: true,
			path: "/api/auth/refresh-token",
		});
		res.status(200).send({ success: true, data: user, token });
	} catch (error) {
		next(error);
	}
};

exports.getAccessToken = async (req, res) => {
	return res.status(100).send("qdg");
};
exports.signIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.send({ errors: [{ msg: "email or password is uncorrect" }] });
		}
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res
				.status(400)
				.send({ errors: [{ msg: "email or password is uncorrect" }] });
		}
		const payload = { _id: user._id };
		const token = jwt.sign(payload, process.env.key, { expiresIn: "24h" });
		res.status(200).send({ msg: "login successfully", user, token });
	} catch (error) {
		res.status(500).send({ errors: [{ msg: "couldn't login" }] });
	}
};

exports.logout = async (req, res, next) => {};
