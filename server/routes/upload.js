const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadReceipt } = require("../controllers/uploadController");
const { protect } = require("../middleware/auth");

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.post("/receipt", protect, upload.single("receipt"), uploadReceipt);

module.exports = router;
