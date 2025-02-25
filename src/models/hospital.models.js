import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true
  },
  address:{
    type: String,
    required: true,
    trim: true,
  },
  amenities: [String],
  rating: Number,
  no_of_reviews: Number,
  categories: [String],
  emergencyServices: Boolean,
  availableBeds: Number,
});

const Hospital = mongoose.model("Hospital", HospitalSchema);
export default Hospital;