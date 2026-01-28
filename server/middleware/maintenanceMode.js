const Settings = require("../models/Settings");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to check if maintenance mode is enabled
const checkMaintenanceMode = async (req, res, next) => {
  try {
    // Skip maintenance check for:
    // 1. Settings endpoints (to allow toggling maintenance mode)
    // 2. Auth endpoints (to allow admin login)
    // 3. Health check endpoint
    const exemptPaths = [
      "/api/settings",
      "/api/auth",
      "/api/health",
      "/api/debug",
    ];

    if (exemptPaths.some((path) => req.path.startsWith(path))) {
      return next();
    }

    const settings = await Settings.getSettings();

    // If maintenance mode is enabled
    if (settings.maintenanceMode) {
      // Try to extract user from JWT token to check if they're an admin
      let isAdmin = false;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        try {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded.id);

          if (user && user.role === "admin") {
            isAdmin = true;
          }
        } catch (error) {
          // Token verification failed, user is not authenticated
          isAdmin = false;
        }
      }

      // Allow admin users to bypass maintenance mode
      if (isAdmin) {
        return next();
      }

      // Return maintenance mode response for regular users
      return res.status(503).json({
        success: false,
        maintenanceMode: true,
        message:
          settings.maintenanceMessage ||
          "We are currently performing scheduled maintenance. We'll be back soon!",
      });
    }

    // Maintenance mode is not enabled, proceed normally
    next();
  } catch (error) {
    console.error("Maintenance mode check error:", error);
    // On error, allow the request to proceed to avoid blocking the entire site
    next();
  }
};

module.exports = checkMaintenanceMode;
