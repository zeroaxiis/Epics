const express = require("express");
const { bookAppointment, confirmAppointment, getUserAppointments, getAllAppointments } = require("../controllers/appointmentController");

const router = express.Router();

router.post("/book", bookAppointment);
router.put("/confirm/:appointmentId", confirmAppointment);
router.get("/user/:email", getUserAppointments);
router.get("/all", getAllAppointments);

module.exports = router;
