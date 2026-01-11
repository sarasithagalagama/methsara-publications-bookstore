const Book = require("../models/Book");

// @desc    Get all books with filters
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res, next) => {
  try {
    const { category, grade, subject, search, minPrice, maxPrice, sort } =
      req.query;

    // Build query
    let query = {};

    if (category) {
      query.category = category;
    }

    if (grade) {
      query.grade = grade;
    }

    if (subject) {
      query.subject = { $regex: subject, $options: "i" };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { titleSinhala: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sort options
    let sortOption = {};
    if (sort === "price-asc") {
      sortOption = { price: 1 };
    } else if (sort === "price-desc") {
      sortOption = { price: -1 };
    } else if (sort === "title") {
      sortOption = { title: 1 };
    } else {
      sortOption = { displayOrder: 1, createdAt: -1 }; // Default: by display order, then newest first
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      count: books.length,
      page,
      pages: Math.ceil(total / limit),
      total,
      books,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private/Admin
exports.createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      book,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
exports.updateBook = async (req, res, next) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk update books (for sales, discounts, etc.)
// @route   PUT /api/books/bulk-update
// @access  Private/Admin
exports.bulkUpdateBooks = async (req, res, next) => {
  try {
    const { bookIds, operation, data } = req.body;

    // Validate input
    if (!bookIds || !Array.isArray(bookIds) || bookIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of book IDs",
      });
    }

    if (!operation) {
      return res.status(400).json({
        success: false,
        message: "Please specify an operation",
      });
    }

    let updateData = {};

    switch (operation) {
      case "applyDiscount":
        // Apply percentage discount
        if (
          !data.discountPercentage ||
          data.discountPercentage <= 0 ||
          data.discountPercentage > 100
        ) {
          return res.status(400).json({
            success: false,
            message: "Please provide a valid discount percentage (1-100)",
          });
        }

        // Get books to calculate sale prices
        const booksForDiscount = await Book.find({ _id: { $in: bookIds } });

        // Update each book with calculated sale price
        const discountUpdates = booksForDiscount.map(async (book) => {
          const salePrice = Math.round(
            book.price * (1 - data.discountPercentage / 100)
          );
          return Book.findByIdAndUpdate(
            book._id,
            {
              salePrice,
              discountPercentage: data.discountPercentage,
              isOnSale: true,
              ...(data.saleStartDate && { saleStartDate: data.saleStartDate }),
              ...(data.saleEndDate && { saleEndDate: data.saleEndDate }),
            },
            { new: true }
          );
        });

        await Promise.all(discountUpdates);
        break;

      case "setSalePrice":
        // Set fixed sale price
        if (!data.salePrice || data.salePrice <= 0) {
          return res.status(400).json({
            success: false,
            message: "Please provide a valid sale price",
          });
        }

        updateData = {
          salePrice: data.salePrice,
          isOnSale: true,
          ...(data.saleStartDate && { saleStartDate: data.saleStartDate }),
          ...(data.saleEndDate && { saleEndDate: data.saleEndDate }),
        };
        break;

      case "setDates":
        // Set sale dates only
        updateData = {
          ...(data.saleStartDate && { saleStartDate: data.saleStartDate }),
          ...(data.saleEndDate && { saleEndDate: data.saleEndDate }),
        };
        break;

      case "toggleFlashSale":
        // Toggle flash sale status
        updateData = {
          isFlashSale: data.isFlashSale !== undefined ? data.isFlashSale : true,
        };
        break;

      case "clearSales":
        // Remove all sale settings
        updateData = {
          $unset: {
            salePrice: "",
            discountPercentage: "",
            saleStartDate: "",
            saleEndDate: "",
          },
          isOnSale: false,
          isFlashSale: false,
        };
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid operation",
        });
    }

    // Perform bulk update (except for applyDiscount which is handled above)
    let result;
    if (operation !== "applyDiscount") {
      result = await Book.updateMany({ _id: { $in: bookIds } }, updateData);
    } else {
      result = { modifiedCount: bookIds.length };
    }

    // Get updated books
    const updatedBooks = await Book.find({ _id: { $in: bookIds } });

    res.status(200).json({
      success: true,
      message: `Successfully updated ${result.modifiedCount} book(s)`,
      count: result.modifiedCount,
      books: updatedBooks,
    });
  } catch (error) {
    next(error);
  }
};
