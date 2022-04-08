const mongoose = require("mongoose");
const { Role } = require("../helpers/constants");
const UserSchema = new mongoose.Schema({
	firstName: { type: String, require: true },
	lastName: { type: String, require: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: {
		type: String,
		enum: [Role.DOCTOR, Role.PATIENT],
		default: Role.PATIENT,
	},
});

module.exports = mongoose.model("user", UserSchema);
