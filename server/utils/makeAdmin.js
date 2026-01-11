const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const path = require("path");

// Load env vars
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const makeAdmin = async () => {
  try {
    const email = process.argv[2];

    if (!email) {
      console.error("Please provide an email address.");
      console.log("Usage: node server/utils/makeAdmin.js <email>");
      process.exit(1);
    }

    // Connect to DB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      console.error(`User not found with email: ${email}`);
      process.exit(1);
    }

    if (user.role === "admin") {
      console.log(`${user.name} is already an admin.`);
      process.exit(0);
    }

    // Update Role
    user.role = "admin";
    await user.save();

    console.log(`✅ Success! ${user.name} (${user.email}) is now an ADMIN.`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

makeAdmin();
