const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not defined");

    // Auto-fix common paste errors: Nuclear option - Strip EVERYTHING until 'm' (start of mongodb)
    uri = uri.replace(/^[^m]+/, "");

    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    global.dbError = error.message;
    // process.exit(1); // Do not exit in serverless environment
  }
};

module.exports = connectDB;
