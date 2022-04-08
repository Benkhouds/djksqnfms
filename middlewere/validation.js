const { Role } = require("../helpers/constants");
const { body, validationResult } = require("express-validator");

const signUpValidation = [
	body("email", "not a valid email").isEmail(),
	body("password", "password should exceed 5 characters").isLength({
		min: 6,
	}),
	body("firstName", "firstName should exceed 5 characters").isLength({
		min: 3,
	}),
	body("lastName", "password should exceed 5 characters").isLength({
		min: 4,
	}),
	body("role", "password should exceed 5 characters").isWhitelisted([
		Role.DOCTOR,
		Role.PATIENT,
	]),
];

const validate = (req, _res, next) => {
	console.log("in");
	const errors = validationResult(req);
	console.log(errors);
	console.log(errors.isEmpty());
	if (!errors.isEmpty()) {
		throw new BadRequest();
	}
	next();
};

module.exports = {
	validate,
	signUpValidation,
};
