const mongoose = require("mongoose");

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

module.exports = mongoose.model("Hospital", HospitalSchema);
