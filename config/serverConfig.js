const express = require("express");
const cors = require("cors");

const hospitalRoutes = require("../routes/hospitalRoutes");
const appointmentRoutes = require("../routes/appointmentRoutes");

const setupServer = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/hospitals", hospitalRoutes);
  app.use("/appointments", appointmentRoutes);

  return app;
};

module.exports = setupServer;
