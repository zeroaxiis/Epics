const express = require("express");
const Appointment = require("../models/Appointment");
const Hospital = require("../models/Hospital");

const router = express.Router();

// Book an appointment
router.post("/book", async (req, res) => {
  const { patientName, email, phone, hospitalId } = req.body;

  try {
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }
    
    if (hospital.availableBeds <= 0) {
      return res.status(400).json({ message: "No available beds at this hospital." });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      patientName,
      email,
      phone,
      hospitalId,
      status: "Pending",
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Confirm appointment (WITHOUT Email)
router.put("/confirm/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status === "Confirmed") {
      return res.status(400).json({ message: "Appointment is already confirmed." });
    }

    // Find hospital and check if beds are available
    const hospital = await Hospital.findById(appointment.hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    if (hospital.availableBeds <= 0) {
      return res.status(400).json({ message: "No available beds at this hospital." });
    }

    // Update appointment status
    appointment.status = "Confirmed";
    await appointment.save();

    // Reduce available beds
    await Hospital.findByIdAndUpdate(hospital._id, { $inc: { availableBeds: -1 } });

    console.log(`Appointment confirmed: ${appointmentId} for ${appointment.patientName}`);

    res.json({ message: "Appointment confirmed!", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get user appointments
router.get("/user/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const appointments = await Appointment.find({ email, status: "Confirmed" }).populate("hospitalId");
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all appointments
router.get("/all", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("hospitalId");
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
