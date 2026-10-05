const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import your router files
const adminRoutes = require("./routes/adminRoutes");
const progressRoutes = require("./routes/progressRoutes");

// Plug the routes into the API
app.use("/api/admin", adminRoutes);
app.use("/api/progress", progressRoutes); // <-- This is the missing link!

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
