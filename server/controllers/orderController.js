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

    // Send confirmation email to Customer
    try {
      // Need full order with book details for template
      // Since orderItems already has book info (price, id), we might need titles
      // But orderItems array above just has IDs.
      // Let's rely on Populate for simplicity and correctness
      const fullOrder = await Order.findById(order._id)
        .populate("user", "email name")
        .populate("items.book", "title");

      // 1. Customer Email
      const customerHtml = generateEmailTemplate(
        fullOrder,
        "Order Confirmation 🎉",
        "Thank you for your order! We will process it shortly."
      );

      await sendEmail({
        email: req.user.email,
        subject: "Order Confirmation - Methsara Publications",
        html: customerHtml,
      });

      // 2. Admin/Owner Email
      const adminHtml = generateEmailTemplate(
        fullOrder,
        "New Order Received 🚀",
        `You have received a new order from <strong>${req.user.name}</strong>.`
      );

      // Send to owner/admin email defined in env
      if (process.env.SMTP_EMAIL) {
        await sendEmail({
          email: process.env.SMTP_EMAIL,
          subject: `New Order #${order._id
            .toString()
            .slice(-8)
            .toUpperCase()} - Methsara Publications`,
          html: adminHtml,
        });
      }
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

// Helper to generate rich email template
const generateEmailTemplate = (order, title, messageText) => {
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const logoUrl =
    "https://public-files.gumroad.com/f6f6838d0411770956424e65492379db.png"; // Placeholder book logo or use your own if available

  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        ${item.book.title}
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">
        Rs. ${item.price.toLocaleString()}
      </td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
        .header { background-color: #059669; padding: 20px; text-align: center; color: white; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px 20px; }
        .order-info { background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th { text-align: left; padding: 8px; border-bottom: 2px solid #ddd; color: #555; }
        .total { text-align: right; font-size: 18px; font-weight: bold; color: #059669; }
        .button { display: inline-block; background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
        .footer { background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Methsara Publications</h1>
        </div>
        <div class="content">
          <h2>${title}</h2>
          <p>Hi ${order.user.name.split(" ")[0]},</p>
          <p>${messageText}</p>
          
          <div class="order-info">
            <p style="margin: 0;"><strong>Order ID:</strong> #${order._id
              .toString()
              .slice(-8)
              .toUpperCase()}</p>
            <p style="margin: 5px 0 0;"><strong>Date:</strong> ${new Date(
              order.createdAt
            ).toLocaleDateString()}</p>
          </div>

          <h3>Order Summary</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div class="total">
            Total: Rs. ${order.totalAmount.toLocaleString()}
          </div>

          <h3>Shipping Address</h3>
          <p style="color: #666; margin-bottom: 5px;">
            ${order.shippingAddress.name}<br>
            ${order.shippingAddress.street}<br>
            ${order.shippingAddress.city}, ${
    order.shippingAddress.postalCode
  }<br>
            ${order.shippingAddress.country}
          </p>
          <p style="color: #666;">Phone: ${order.shippingAddress.phone}</p>

          <div style="text-align: center;">
            <a href="${clientUrl}/my-orders" class="button">View Order Details</a>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Methsara Publications. All rights reserved.</p>
          <p>If you have any questions, please reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
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
      const fullOrder = await Order.findById(order._id)
        .populate("user", "email name")
        .populate("items.book", "title");

      const htmlContent = generateEmailTemplate(
        fullOrder,
        "Payment Verified ✅",
        "Your payment has been successfully verified. We are now processing your order."
      );

      await sendEmail({
        email: fullOrder.user.email,
        subject: "Payment Verified - Methsara Publications",
        html: htmlContent,
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
      const fullOrder = await Order.findById(order._id)
        .populate("user", "email name")
        .populate("items.book", "title");

      const htmlContent = generateEmailTemplate(
        fullOrder,
        `Order ${status} 📦`,
        `The status of your order has been updated to <strong>${status}</strong>.`
      );

      await sendEmail({
        email: fullOrder.user.email,
        subject: `Order ${status} - Methsara Publications`,
        html: htmlContent,
      });

      console.log(
        `Sending email to ${fullOrder.user.email} for status ${status}`
      );
    } catch (emailError) {
      console.error("UNKNOWN EMAIL ERROR:", emailError);
      console.error("Stack:", emailError.stack);
      // We don't fail the request, but we want to see this in logs
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};
