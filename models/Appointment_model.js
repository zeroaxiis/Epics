import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  email: String,
  phone: String,
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  status: { type: String, default: "Pending" },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
