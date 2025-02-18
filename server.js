const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const DEFAULT_PORT = 5000;
const PORT = process.env.PORT || DEFAULT_PORT;

const db = mongoose.connection;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
db.once("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("MongoDB connection error:", err));
});

// Routes
app.use("/hospitals", require("./routes/hospitalRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
