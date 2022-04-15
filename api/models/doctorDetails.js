const mongoose = require('mongoose');

const doctorDetailsSchema = new mongoose.Schema({
	img: String,
	category: String,
	label: String,
	education: String,
	designation: String,
	department: String,
	hospital: String,
	rating: Number,
});

module.exports = mongoose.model('DoctorDetail', doctorDetailsSchema);
