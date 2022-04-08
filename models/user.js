const mongoose = require("mongoose");
const { nextTick } = require("process");
const { Category } = require("../helpers/constants");
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
	categories: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "category",
			},
		],
		default: [],
	},
});

UserSchema.pre("find", function (next) {
	if (this.role == Role.DOCTOR) {
		this.populate("categories", "-password");
	}
	next();
});

module.exports = mongoose.model("user", UserSchema);
