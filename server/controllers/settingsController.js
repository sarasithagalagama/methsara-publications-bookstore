const Settings = require("../models/Settings");

// @desc    Get settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve settings",
    });
  }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private/Admin
exports.updateSettings = async (req, res) => {
  try {
    const { maintenanceMode, maintenanceMessage } = req.body;

    const settings = await Settings.getSettings();

    if (maintenanceMode !== undefined) {
      settings.maintenanceMode = maintenanceMode;
    }

    if (maintenanceMessage !== undefined) {
      settings.maintenanceMessage = maintenanceMessage;
    }

    await settings.save();

    res.json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update settings",
    });
  }
};
