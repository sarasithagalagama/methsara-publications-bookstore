const { put } = require("@vercel/blob");

// @desc    Upload receipt to Vercel Blob
// @route   POST /api/upload/receipt
// @access  Private
exports.uploadReceipt = async (req, res, next) => {
  console.log("Upload Receipt Controller Hit");
  console.log("Type of next:", typeof next);
  console.log("BLOB_TOKEN present:", !!process.env.BLOB_READ_WRITE_TOKEN);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file (JPEG, PNG, or WebP)",
      });
    }

    // Validate file size (max 5MB)
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size should not exceed 5MB",
      });
    }

    // Upload to Vercel Blob
    const filename = `receipts/${Date.now()}-${req.file.originalname}`;
    const blob = await put(filename, req.file.buffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    res.status(200).json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    // Explicitly handle error to avoid "next is not a function" crash
    if (res && !res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Upload failed: " + error.message,
      });
    }
    if (typeof next === "function") next(error);
  }
};

// @desc    Upload generic image (for books etc)
// @route   POST /api/upload/image
// @access  Private/Admin
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file (JPEG, PNG, or WebP)",
      });
    }

    // Validate file size (max 5MB)
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size should not exceed 5MB",
      });
    }

    // Upload to Vercel Blob
    const filename = `books/${Date.now()}-${req.file.originalname}`;
    const blob = await put(filename, req.file.buffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    res.status(200).json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    if (res && !res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Upload failed: " + error.message,
      });
    }
    if (typeof next === "function") next(error);
  }
};
