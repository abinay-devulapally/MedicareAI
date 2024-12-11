var express = require("express");
const appointmentcontroller = require("../controllers/appointment.controller");

var router = express.Router();

// Routes for appointments
router.get("/getAll/:id", appointmentcontroller.get_appointment);
router.get("/:id", appointmentcontroller.get_one_appointment);
router.post("/:id", appointmentcontroller.appointment_create_post);
router.delete("/delete/:id", appointmentcontroller.appointment_delete);
router.put("/appointments/:id", appointmentcontroller.UpdateAppointment); // Corrected function name

// Route for adding location (ensure this function exists and is exported)
router.post("/postlocation", appointmentcontroller.addlocation);

module.exports = router;
