const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  uploadReceipt,
  uploadImage,
} = require("../controllers/uploadController");
const { protect, authorize } = require("../middleware/auth");

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.post("/receipt", protect, upload.single("receipt"), uploadReceipt);
router.post(
  "/image",
  protect,
  authorize("admin"),
  upload.single("image"),
  uploadImage
);

module.exports = router;
