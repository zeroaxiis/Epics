const express = require("express");
const Hospital = require("../models/Hospital");

const router = express.Router();

// Get hospitals sorted by available beds
router.get("/sorted", async (req, res) => {
  try {
    const hospitals = await Hospital.aggregate([
      { $match: { availableBeds: { $gt: 0 } } },
      { $sort: { availableBeds: -1 } },
    ]);
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
