const mongoose = require('mongoose');
const { RequestState } = require('../helpers/constants');

const AppointmentSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	description: { type: String, required: false },
	target: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	requester: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	status: {
		type: Number,
		enum: Object.values(RequestState),
		default: RequestState.Pending,
	},
});

AppointmentSchema.pre('find', function (next) {
	this.populate('requester').populate({
		path: 'target',
		populate: 'details',
	});
	next();
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
