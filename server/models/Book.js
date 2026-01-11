const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a book title"],
    trim: true,
  },
  titleSinhala: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Please provide an author name"],
    trim: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
    trim: true,
  },
  grade: {
    type: String,
    required: [true, "Please provide a grade"],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
  },
  backCoverImage: {
    type: String,
  },
  pageCount: {
    type: Number,
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isFlashSale: {
    type: Boolean,
    default: false,
  },
  salePrice: {
    type: Number,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  saleStartDate: {
    type: Date,
  },
  saleEndDate: {
    type: Date,
  },
  stock: {
    type: Number,
    min: 0,
    default: 100,
  },
  isbn: {
    type: String,
    trim: true,
  },
  displayOrder: {
    type: Number,
    default: 999,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual field to check if book is currently on sale
bookSchema.virtual("isOnSale").get(function () {
  if (!this.salePrice && !this.discountPercentage) return false;
  if (!this.saleStartDate || !this.saleEndDate) return true; // If no dates set, sale is always active
  const now = new Date();
  return now >= this.saleStartDate && now <= this.saleEndDate;
});

// Update the updatedAt field before saving
bookSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  if (typeof next === "function") {
    next();
  }
});

module.exports = mongoose.model("Book", bookSchema);
