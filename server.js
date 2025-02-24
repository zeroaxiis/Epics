import "dotenv/config"; // Load environment variables
import connectDB from "./config/db.js";
import setupServer from "./config/serverConfig.js";

// Connect to Database
connectDB();

// Setup Express App
const app = setupServer();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
