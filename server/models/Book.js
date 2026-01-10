const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a book title"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Please provide an author name"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
    enum: ["Grade 6-11", "Advanced Level"],
  },
  grade: {
    type: String,
    required: [true, "Please provide a grade"],
    enum: ["6", "7", "8", "9", "10", "11", "12", "13"],
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
    required: [true, "Please provide a description"],
    trim: true,
  },
  synopsis: {
    type: String,
    trim: true,
  },
  coverImage: {
    type: String,
    default: "/images/default-book-cover.jpg",
  },
  stock: {
    type: Number,
    required: [true, "Please provide stock quantity"],
    min: 0,
    default: 0,
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
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

// Update the updatedAt field before saving
bookSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Book", bookSchema);
