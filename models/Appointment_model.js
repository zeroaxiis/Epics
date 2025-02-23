const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  email: String,
  phone: String,
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
