const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("./models/Book");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected for Checking Books");
    const count = await Book.countDocuments();
    console.log(`Total Books in DB: ${count}`);
    if (count > 0) {
      const books = await Book.find().limit(3);
      console.log("Sample Books:", JSON.stringify(books, null, 2));
    }
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
