require("dotenv").config();  // Load environment variables
const connectDB = require("./config/db");
const setupServer = require("./config/serverConfig");

// Connect to Database
connectDB();

// Setup Express App
const app = setupServer();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
