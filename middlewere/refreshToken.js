const { Unauthorized } = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, _res, next) => {
	try {
		const refreshToken = req?.cookies.jid;
		if (!refreshToken) {
			throw new Unauthorized();
		}
		const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
		const user = await User.findById(payload?._id);
		if (!user) {
			throw new Unauthorized();
		}
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};
