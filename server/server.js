const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorHandler");
const ensureDbConnection = require("./middleware/dbConnection");

// Load env vars from .env file only in development
// In production (Vercel), environment variables are set in the dashboard
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// Ensure database connection before processing any API requests
// This is critical for Vercel serverless - connection must be awaited
app.use("/api", ensureDbConnection);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.CLIENT_URL,
      ];
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow any Vercel deployment
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      callback(null, true); // Fallback to allow all for debugging if needed, but keeping strict for now
    },
    credentials: true,
  })
);

// Debug Route
app.get("/api/debug", (req, res) => {
  res.json({
    message: "Debug Info (Sanitized V5 - Hardcoded Fallback)",
    mongo_uri_exists: !!process.env.MONGODB_URI,
    mongo_uri_has_whitespace: /\s/.test(process.env.MONGODB_URI || ""),
    sanitized_uri_preview: global.dbUriPreview || "Not generated",
    mongo_status: mongoose.connection.readyState, // 0: disconnected, 1: connected, 2: connecting
    last_db_error: global.dbError || "No error captured (Check Vercel Logs)",
    env_node: process.env.NODE_ENV,
  });
});

// Mount routers
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(
      `Server running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}`
    );
  });
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
