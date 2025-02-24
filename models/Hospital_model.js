import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  amenities: [String],
  rating: Number,
  no_of_reviews: Number,
  categories: [String],
  emergencyServices: Boolean,
  availableBeds: Number,
});

const Hospital = mongoose.model("Hospital", HospitalSchema);
export default Hospital;
