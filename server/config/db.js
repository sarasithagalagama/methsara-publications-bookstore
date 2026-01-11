const mongoose = require("mongoose");

/**
 * Global cache for MongoDB connection (Singleton Pattern)
 * This prevents connection exhaustion in Vercel's serverless environment
 * where each function invocation would otherwise create a new connection.
 */
let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

const connectDB = async () => {
  // Return existing connection if available
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  // Return pending connection promise if connection is in progress
  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      const error = new Error(
        "MONGODB_URI is not defined in environment variables. " +
          "Please add it in Vercel Dashboard > Settings > Environment Variables"
      );
      console.error(error.message);
      global.dbError = error.message;
      throw error;
    }

    // Validate URI format
    if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
      const error = new Error(
        "Invalid MONGODB_URI format. Must start with 'mongodb://' or 'mongodb+srv://'. " +
          "Check for whitespace or extra characters in Vercel environment variables."
      );
      console.error(error.message);
      global.dbError = error.message;
      throw error;
    }

    // Check for whitespace (common issue when pasting in Vercel)
    if (/\s/.test(uri)) {
      const error = new Error(
        "MONGODB_URI contains whitespace characters. " +
          "Please remove all spaces, tabs, and newlines from the environment variable in Vercel."
      );
      console.error(error.message);
      global.dbError = error.message;
      throw error;
    }

    console.log("Creating new MongoDB connection...");

    // Store preview for debugging (without exposing credentials)
    global.dbUriPreview = uri.substring(0, 15) + "...";

    // Create connection with serverless-optimized options
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false, // Disable buffering in serverless environment
      maxPoolSize: 10, // Limit connection pool size
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB Connected: ${cached.conn.connection.host}`);
    global.dbError = null; // Clear any previous errors
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset promise on error so next call will retry
    console.error(`MongoDB Connection Error: ${error.message}`);
    global.dbError = error.message;
    throw error;
  }
};

module.exports = connectDB;
