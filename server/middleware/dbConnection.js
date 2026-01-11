const connectDB = require("../config/db");

/**
 * Middleware to ensure MongoDB connection is ready before processing requests
 * This is critical for Vercel serverless functions where the connection
 * may not be established when the function first wakes up (cold start)
 */
const ensureDbConnection = async (req, res, next) => {
  try {
    // Await the database connection before proceeding
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection middleware error:", error.message);
    res.status(500).json({
      success: false,
      error: "Database connection failed",
      message: error.message,
    });
  }
};

module.exports = ensureDbConnection;
