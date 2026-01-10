// Script to set display order based on grade
// Run this in the server directory: node set_grade_order.js

require("dotenv").config();
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  titleSinhala: String,
  author: String,
  publisher: String,
  category: String,
  grade: String,
  subject: String,
  price: Number,
  description: String,
  image: String,
  backCoverImage: String,
  pageCount: Number,
  rating: Number,
  isFlashSale: Boolean,
  salePrice: Number,
  discountPercentage: Number,
  saleStartDate: Date,
  saleEndDate: Date,
  stock: Number,
  isbn: String,
  displayOrder: Number,
  createdAt: Date,
  updatedAt: Date,
});

const Book = mongoose.model("Book", bookSchema);

// Grade priority mapping (lower number = appears first)
const gradePriority = {
  "A/L": 1,
  "Grade 6": 2,
  "Grade 7": 3,
  "Grade 8": 4,
  "Grade 9": 5,
  "Grade 10": 6,
  "Grade 11": 7,
};

async function setGradeOrder() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const books = await Book.find({});
    console.log(`Found ${books.length} books`);

    let updated = 0;
    for (const book of books) {
      const basePriority = gradePriority[book.grade] || 999;

      // Set displayOrder: grade priority * 100 + current order
      // This groups by grade while maintaining some internal order
      const newOrder = basePriority * 100 + (book.displayOrder || 999);

      await Book.findByIdAndUpdate(book._id, {
        displayOrder: newOrder,
      });

      console.log(
        `Updated ${book.titleSinhala || book.title}: Grade ${
          book.grade
        } → Order ${newOrder}`
      );
      updated++;
    }

    console.log(`\n✅ Successfully updated ${updated} books!`);
    console.log("\nBooks will now appear in this order:");
    console.log("1. A/L books (100-199)");
    console.log("2. Grade 6 books (200-299)");
    console.log("3. Grade 7 books (300-399)");
    console.log("4. Grade 8 books (400-499)");
    console.log("5. Grade 9 books (500-599)");
    console.log("6. Grade 10 books (600-699)");
    console.log("7. Grade 11 books (700-799)");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

setGradeOrder();
