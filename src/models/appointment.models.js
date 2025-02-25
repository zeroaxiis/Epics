import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
    {
        fullname:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true,
            trim: true
        },
        patientAge:{
            type: Number,
            required: true
        },
        email:{type: mongoose.Schema.Types.ObjectId,ref: "User", required: true},
        phone:{ type: String,
            required: true,
            min: 10,
            max: 10,
            unique: true
        },
        hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
        status: { type: String, default: "Pending" },
        appointmentDate: { type: Date, required: true },
        appointmentTime: { type: String, required: true }
    },{
        timestamps: true
    }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;