const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserRole,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

// All routes are protected and restricted to admin
router.use(protect);
router.use(authorize("admin"));

router.route("/").get(getAllUsers);
router.route("/:id/role").put(updateUserRole);

module.exports = router;
