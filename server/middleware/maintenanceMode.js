const Settings = require("../models/Settings");

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
      // Check if user is authenticated and is an admin
      if (req.user && req.user.role === "admin") {
        // Allow admin users to bypass maintenance mode
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
