const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected for Checking");

    // 1. Find the user
    const user = await User.findOne({ email: "admin@methsara.lk" }).select(
      "+password"
    );

    if (!user) {
      console.log("❌ Admin user NOT found in database.");
    } else {
      console.log("✅ Admin user found:");
      console.log("ID:", user._id);
      console.log("Email:", user.email);
      console.log("Role:", user.role);
      console.log("Hashed Password:", user.password); // Display hash to ensure it's hashed

      // 2. Test password compare manually
      const isMatch = await user.comparePassword("password123");
      console.log(
        "Test 'password123' match:",
        isMatch ? "✅ MATCH" : "❌ NO MATCH"
      );
    }

    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
