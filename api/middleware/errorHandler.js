const { ErrorResponse } = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
module.exports = (error, req, res, next) => {
	console.log(error);
	if (error instanceof ErrorResponse) {
		console.log(error.message);
		return res
			.status(error.statusCode)
			.json({ success: false, error: error.message });
	}

	if (error instanceof jwt.TokenExpiredError) {
		return res.status(400).json({ success: false, error: "Token expired" });
	}

	if (error instanceof jwt.JsonWebTokenError) {
		return res.status(401).json({ success: false, error: "Invalid token" });
	}

	return res
		.status(500)
		.json({ success: false, error: "internal server error" });
};
