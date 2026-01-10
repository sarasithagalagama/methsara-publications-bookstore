const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Book = require("./models/Book");
const books = require("./data/books");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    // --- Seed Admin ---
    const adminExists = await User.findOne({ email: "admin@methsara.lk" });

    if (adminExists) {
      console.log("Admin user already exists");
    } else {
      const adminUser = new User({
        name: "Super Admin",
        email: "admin@methsara.lk",
        password: "password123", // Will be hashed by pre-save hook
        role: "admin",
        phone: "0771234567",
        address: {
          street: "123 Admin St",
          city: "Colombo",
          province: "Western",
          postalCode: "10100",
          country: "Sri Lanka",
        },
      });

      await adminUser.save();
      console.log("Admin user created successfully");
      console.log("Email: admin@methsara.lk");
      console.log("Password: password123");
    }

    // --- Seed Books ---
    console.log("Seeding Books...");
    // Clear existing books to avoid duplicates
    await Book.deleteMany({});
    console.log("Cleared existing books.");

    await Book.insertMany(books);
    console.log(`${books.length} Books created successfully`);

    console.log("DATA SEEDING COMPLETED!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
