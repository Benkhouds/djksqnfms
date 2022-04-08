const { ErrorResponse } = require("../utils/errorResponse");

module.exports = (error, req, res, next) => {
	if (error instanceof ErrorResponse) {
		return res
			.status(error.statusCode)
			.json({ success: false, error: error.message });
	}
	return res
		.status(500)
		.json({ success: false, error: "internal server error" });
};
