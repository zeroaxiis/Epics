import Appointment from "../models/appointment.models.js";
import Hospital from "../models/hospital.models.js";

// Book an appointment
export const bookAppointment = async (req, res) => {
  try {
    const { patientName, email, phone, hospitalId } = req.body;
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found." });
    }

    if (hospital.availableBeds <= 0) {
      return res.status(400).json({ message: "No available beds at this hospital." });
    }

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
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Confirm appointment
export const confirmAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (appointment.status === "Confirmed") {
      return res.status(400).json({ message: "Appointment is already confirmed." });
    }

    const hospital = await Hospital.findById(appointment.hospitalId);
    if (!hospital) return res.status(404).json({ message: "Hospital not found" });

    if (hospital.availableBeds <= 0) {
      return res.status(400).json({ message: "No available beds at this hospital." });
    }

    appointment.status = "Confirmed";
    await appointment.save();

    await Hospital.findByIdAndUpdate(hospital._id, { $inc: { availableBeds: -1 } });

    res.json({ message: "Appointment confirmed!", appointment });
  } catch (error) {
    console.error("Error confirming appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user appointments
export const getUserAppointments = async (req, res) => {
  try {
    const { email } = req.params;
    const appointments = await Appointment.find({ email, status: "Confirmed" }).populate("hospitalId");
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("hospitalId");
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching all appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};