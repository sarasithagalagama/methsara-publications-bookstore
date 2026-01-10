const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    // TEMPORARY: Hardcoded fallback if env var is corrupted
    if (!uri || uri.trim().length === 0) {
      uri =
        "mongodb+srv://sarasithagalagama_db_user:14EjbwV0ifCnm73R@methsara-prod.jreyzlj.mongodb.net/methsara-store?appName=methsara-prod";
      console.log("Using hardcoded URI fallback");
    } else {
      // Auto-fix common paste errors: Nuclear option - Strip EVERYTHING until 'm' (start of mongodb)
      uri = uri.replace(/^[^m]+/, "");
    }

    global.dbUriPreview = uri.substring(0, 15) + "..."; // Store preview for debug

    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    global.dbError = error.message;
    // process.exit(1); // Do not exit in serverless environment
  }
};

module.exports = connectDB;
