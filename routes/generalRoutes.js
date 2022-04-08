const express = require("express");
const {
	getAppointments,
	getDoctors,
	requestAppointment,
	approveAppointment,
} = require("../controllers/appointment");
const { Role } = require("../helpers/constants");
const router = express.Router();
const authMiddleware = require("../middlewere/auth");

router.get("/doctors", authMiddleware(Role.PATIENT), getDoctors);

router
	.route("/patient/appointments")
	.all(authMiddleware(Role.PATIENT))
	.get(getAppointments)
	.post(requestAppointment);

router
	.route("/doctor/appointments")
	.all(authMiddleware(Role.DOCTOR))
	.get(getAppointments)
	.post(approveAppointment);

module.exports = router;
