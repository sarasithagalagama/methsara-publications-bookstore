// Script to reorder A/L Biology books
// Run this in the server directory: node reorder_books.js

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
  createdAt: Date,
  updatedAt: Date,
});

const Book = mongoose.model("Book", bookSchema);

async function reorderBooks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Find the Prayogika book
    const prayogika = await Book.findOne({
      titleSinhala: /ප්‍රායෝගික පරික්ෂණ/,
    });

    // Find විවරණය 1, 2, 3
    const vivaranaya1 = await Book.findOne({
      titleSinhala: /විවරණය 1$/,
    });
    const vivaranaya2 = await Book.findOne({
      titleSinhala: /විවරණය 2$/,
    });
    const vivaranaya3 = await Book.findOne({
      titleSinhala: /විවරණය 3$/,
    });

    if (!prayogika || !vivaranaya1 || !vivaranaya2 || !vivaranaya3) {
      console.log("Could not find all books");
      console.log("Prayogika:", prayogika?.titleSinhala);
      console.log("Vivaranaya 1:", vivaranaya1?.titleSinhala);
      console.log("Vivaranaya 2:", vivaranaya2?.titleSinhala);
      console.log("Vivaranaya 3:", vivaranaya3?.titleSinhala);
      return;
    }

    // Set createdAt dates to control order
    // Most recent first
    const now = new Date();

    await Book.findByIdAndUpdate(prayogika._id, {
      createdAt: new Date(now.getTime() - 0), // Most recent
    });

    await Book.findByIdAndUpdate(vivaranaya1._id, {
      createdAt: new Date(now.getTime() - 1000), // 1 second earlier
    });

    await Book.findByIdAndUpdate(vivaranaya2._id, {
      createdAt: new Date(now.getTime() - 2000), // 2 seconds earlier
    });

    await Book.findByIdAndUpdate(vivaranaya3._id, {
      createdAt: new Date(now.getTime() - 3000), // 3 seconds earlier
    });

    console.log("✅ Books reordered successfully!");
    console.log(
      "Order: Prayogika → Vivaranaya 1 → Vivaranaya 2 → Vivaranaya 3"
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

reorderBooks();
