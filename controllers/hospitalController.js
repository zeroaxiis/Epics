const Hospital = require("../models/Hospital_model");

// Get all hospitals sorted by available beds
const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.aggregate([
      { $match: { availableBeds: { $gt: 0 } } },
      { $sort: { availableBeds: -1 } },
    ]);
    res.json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getHospitals };
