const { Role } = require("../helpers/constants");
const { body, validationResult } = require("express-validator");
const { BadRequest } = require("../utils/errorResponse");

const signUpValidation = [
	body("email", "not a valid email").isEmail(),
	body("password", "password should exceed 5 characters").isLength({
		min: 6,
	}),
	body("firstName", "firstName should exceed 5 characters").isLength({
		min: 3,
	}),
	body("lastName", "lastname kslqdfnmsqf").isLength({
		min: 4,
	}),
	body("role", "incorrect role").custom((value) =>
		Object.values(Role).includes(value)
	),
];

const validate = (req, _res, next) => {
	const [error] = validationResult(req).errors;
	console.log(validationResult(req).errors);
	if (error) {
		throw new BadRequest(error.msg);
	}
	next();
};

module.exports = {
	validate,
	signUpValidation,
};
