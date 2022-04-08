class ErrorResponse extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

class BadRequest extends ErrorResponse {
	constructor(message) {
		super(message ?? "Bad Request", 400);
	}
}
class NotFound extends ErrorResponse {
	constructor(message) {
		super(message ?? "Not Found", 404);
	}
}
class InternalServerError extends ErrorResponse {
	constructor(message) {
		super(message ?? "Internal Server Error", 500);
	}
}
class Forbidden extends ErrorResponse {
	constructor(message) {
		super(message ?? "Forbidden", 403);
	}
}
class UnAuthorized extends ErrorResponse {
	constructor(message) {
		super(message ?? "Not authorized", 401);
	}
}

module.exports = {
	ErrorResponse,
	BadRequest,
	NotFound,
	UnAuthorized,
	Forbidden,
	InternalServerError,
};
