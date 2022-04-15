const { Role, RequestState } = require('../helpers/constants');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const { NotFound, InternalServerError } = require('../utils/errorResponse');

exports.getUser = (req, res) => {
	res.status(200).json({ success: true, data: req.user });
};
exports.getAppointments = async (req, res, next) => {
	try {
		const id = req.user.id;
		const query =
			req.user.role === Role.PATIENT ? { requester: id } : { target: id };
		const appointments = await Appointment.find(query);
		res.status(200).send({ success: true, data: appointments });
	} catch (error) {
		next(error);
	}
};

exports.getDoctors = async (_req, res, next) => {
	try {
		const doctors = await User.find({ role: Role.DOCTOR });
		res.status(200).json({ success: true, data: doctors });
	} catch (error) {
		next(error);
	}
};

exports.requestAppointment = async (req, res, next) => {
	const { doctorId, date } = req.body;
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			throw new NotFound();
		}
		const doctor = await User.findById(doctorId);
		if (!doctor) {
			throw new InternalServerError();
		}
		await Appointment.create({
			requester: user._id,
			target: doctorId,
			date: date,
			status: RequestState.PENDING,
		});
		res.status(200).send({ success: true });
	} catch (error) {
		next(error);
	}
};
exports.updateAppointmentStatus = async (req, res, next) => {
	const appointmentId = req.params?.id;

	try {
		await Appointment.findByIdAndUpdate(appointmentId, {
			status: req.newStatus,
		});
		res.status(200).send({ success: true });
	} catch (error) {
		next(error);
	}
};
