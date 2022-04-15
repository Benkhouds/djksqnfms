const mongoose = require('mongoose');
const { Role } = require('../helpers/constants');
const DoctorDetails = require('./doctorDetails');
const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		select: false,
		required: true,
	},
	role: {
		type: String,
		enum: [Role.DOCTOR, Role.PATIENT],
		default: Role.PATIENT,
	},
	details: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'DoctorDetail',
	},
});

UserSchema.pre('find', function (next) {
	if (this.getQuery()?.role === Role.DOCTOR) {
		this.populate('details');
	}
	next();
});

module.exports = mongoose.model('User', UserSchema);
