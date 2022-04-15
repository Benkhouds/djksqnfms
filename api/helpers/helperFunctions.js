const jwt = require("jsonwebtoken");

exports.generateToken = (id, secret, expiresIn) => {
	const payload = { _id: id };
	const token = jwt.sign(payload, secret, { expiresIn });
	return token;
};
