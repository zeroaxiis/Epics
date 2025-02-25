import express from "express";
import {
  bookAppointment,
  confirmAppointment,
  getUserAppointments,
  getAllAppointments,
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/book", bookAppointment);
router.put("/confirm/:appointmentId", confirmAppointment);
router.get("/user/:email", getUserAppointments);
router.get("/all", getAllAppointments);

export default router;