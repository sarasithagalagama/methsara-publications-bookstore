const express = require("express");
const router = express.Router();
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");
const { protect, admin } = require("../middleware/auth");

// Public route to get settings
router.get("/", getSettings);

// Admin-only route to update settings
router.put("/", protect, admin, updateSettings);

module.exports = router;
