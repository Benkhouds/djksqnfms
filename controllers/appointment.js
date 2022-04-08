const { Role } = require("../helpers/constants");
const User = require("../models/user");
const { NotFound } = require("../utils/errorResponse");

exports.getAppointments = (req, res, next) => {};

exports.getDoctors = async (req, res, next) => {
	try {
		const doctors = await User.find({ role: Role.DOCTOR });
		if (!doctors.length) {
			throw new NotFound();
		}
		res.status(200).json({ success: true, data: doctors });
	} catch (error) {
		next(error);
	}
};

exports.requestAppointment = (req, res, next) => {};
exports.approveAppointment = (req, res, next) => {};
