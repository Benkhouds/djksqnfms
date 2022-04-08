const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
	date: { type: String, require: true },
	target: { type: String, require: true },
	requester: { type: String, required: true, unique: true },
});

AppointmentSchema.pre("find", function (next) {
	this.populate("target", "-password").populate("requester", "-password");
	next();
});

AppointmentSchema.pre("findOne", function (next) {
	this.populate("target", "-password").populate("requester", "-password");
	next();
});
module.exports = mongoose.model("appointment", AppointmentSchema);
