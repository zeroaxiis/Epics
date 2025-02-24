import express from "express";
import cors from "cors";

import hospitalRoutes from "../routes/hospitalRoutes.js";
import appointmentRoutes from "../routes/appointmentRoutes.js";

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

export default setupServer;
