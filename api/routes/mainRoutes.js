const express = require('express');
const {
	getAppointments,
	getDoctors,
	requestAppointment,
	getUser,
	updateAppointmentStatus,
} = require('../controllers/appointment');
const { Role, RequestState } = require('../helpers/constants');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/me', authMiddleware(), getUser);
router.get('/doctors', authMiddleware(Role.PATIENT), getDoctors);

router
	.route('/patient/appointments')
	.all(authMiddleware(Role.PATIENT))
	.get(getAppointments)
	.post(requestAppointment);

router.get(
	'/doctor/appointments',
	authMiddleware(Role.DOCTOR),
	getAppointments
);

router.post(
	'/doctor/appointments/:id/approve',
	authMiddleware(Role.DOCTOR),
	setStatus(RequestState.APPROVED),
	updateAppointmentStatus
);
router.post(
	'/doctor/appointments/:id/reject',
	authMiddleware(Role.DOCTOR),
	setStatus(RequestState.REJECTED),
	updateAppointmentStatus
);

function setStatus(status) {
	return (req, _res, next) => {
		req.newStatus = status;
		next();
	};
}
module.exports = router;
