const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  uploadReceipt,
  getAllOrders,
  verifyPayment,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, authorize } = require("../middleware/auth");

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/all", protect, authorize("admin"), getAllOrders);
router.get("/:id", protect, getOrder);
router.put("/:id/receipt", protect, uploadReceipt);
router.put("/:id/verify", protect, authorize("admin"), verifyPayment);
router.put("/:id/status", protect, authorize("admin"), updateOrderStatus);

module.exports = router;
