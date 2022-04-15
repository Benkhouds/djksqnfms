const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Unauthorized, Forbidden } = require('../utils/errorResponse');
const auth = (roles) => async (req, _res, next) => {
	const bearerToken = req.headers.authorization;

	try {
		if (!bearerToken || !bearerToken.startsWith('Bearer')) {
			throw new Unauthorized("you're not logged in");
		}
		const [_, accessToken] = bearerToken.split(' ');
		const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
		const user = await User.findById(decoded?._id);
		if (!user) {
			throw new Unauthorized('Invalid token');
		}
		console.log(user);
		if (roles && roles.length && !roles.includes(user.role)) {
			throw new Forbidden();
		}
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};
module.exports = auth;
