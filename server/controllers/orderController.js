const Order = require("../models/Order");
const Book = require("../models/Book");
const sendEmail = require("../utils/emailService");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items provided",
      });
    }

    // Calculate total amount and verify stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const book = await Book.findById(item.book);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: `Book not found: ${item.book}`,
        });
      }

      if (book.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${book.title}. Available: ${book.stock}`,
        });
      }

      orderItems.push({
        book: book._id,
        quantity: item.quantity,
        price: book.price,
      });

      totalAmount += book.price * item.quantity;

      // Reduce stock
      book.stock -= item.quantity;
      await book.save();
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      notes,
      receiptImage: req.body.receiptImage,
    });

    // Send confirmation email
    try {
      const message = `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total Amount:</strong> LKR ${totalAmount.toLocaleString()}</p>
        
        <h2>Order Items:</h2>
        <ul>
          ${orderItems
            .map(
              (item) => `
            <li>
              ${item.quantity} x Book (ID: ${item.book}) - LKR ${(
                item.price * item.quantity
              ).toLocaleString()}
            </li>
          `
            )
            .join("")}
        </ul>

        <p>We will process your order shortly.</p>
      `;

      await sendEmail({
        email: req.user.email,
        subject: "Order Confirmation - Methsara Publications",
        message,
      });
    } catch (emailError) {
      console.error("Email send failed:", emailError);
      // Don't fail the order if email fails, just log it
    }

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.book", "title author coverImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.book", "title author coverImage")
      .populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Make sure user is order owner or admin
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload receipt for order
// @route   PUT /api/orders/:id/receipt
// @access  Private
exports.uploadReceipt = async (req, res, next) => {
  try {
    const { receiptUrl } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Make sure user is order owner
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this order",
      });
    }

    // Only allow receipt upload for Pending orders
    if (order.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Receipt can only be uploaded for pending orders",
      });
    }

    order.receiptImage = receiptUrl;
    await order.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/all
// @access  Private/Admin
exports.getAllOrders = async (req, res, next) => {
  try {
    const { status, startDate, endDate } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const orders = await Order.find(query)
      .populate("user", "name email phone")
      .populate("items.book", "title author")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment (Admin)
// @route   PUT /api/orders/:id/verify
// @access  Private/Admin
exports.verifyPayment = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.receiptImage) {
      return res.status(400).json({
        success: false,
        message: "No receipt uploaded for this order",
      });
    }

    order.status = "Paid";
    order.paymentVerifiedAt = Date.now();
    order.paymentVerifiedBy = req.user._id;
    await order.save();

    // Send payment confirmation email
    try {
      const message = `
        <h1>Payment Verified</h1>
        <p>Your payment for Order #${order._id
          .toString()
          .slice(-8)
          .toUpperCase()} has been successfully verified.</p>
        <p>We are now processing your order.</p>
        <p>Thank you for shopping with Methsara Publications!</p>
      `;

      // Get user email - populate if not present or query generic
      // order.user is likely an ObjectId here unless populated, but verifyPayment didn't populate it.
      // We need to fetch user email.
      const fullOrder = await Order.findById(order._id).populate(
        "user",
        "email name"
      );

      await sendEmail({
        email: fullOrder.user.email,
        subject: "Payment Verified - Methsara Publications",
        message,
      });
    } catch (emailError) {
      console.error("Email send failed:", emailError);
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    // Send status update email
    try {
      const fullOrder = await Order.findById(order._id).populate(
        "user",
        "email name"
      );

      const message = `
        <h1>Order Status Update</h1>
        <p>The status of your Order #${order._id
          .toString()
          .slice(-8)
          .toUpperCase()} has been updated to: <strong>${status}</strong>.</p>
        <p>Please check your dashboard for more details.</p>
      `;

      await sendEmail({
        email: fullOrder.user.email,
        subject: `Order ${
          status.charAt(0).toUpperCase() + status.slice(1)
        } - Methsara Publications`,
        message,
      });
    } catch (emailError) {
      console.error("Email send failed:", emailError);
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};
