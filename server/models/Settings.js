const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    maintenanceMessage: {
      type: String,
      default:
        "We are currently performing scheduled maintenance. We'll be back soon!",
    },
    // Ensure only one settings document exists
    _id: {
      type: String,
      default: "app_settings",
    },
  },
  {
    timestamps: true,
  },
);

// Static method to get or create settings
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findById("app_settings");
  if (!settings) {
    settings = await this.create({
      _id: "app_settings",
      maintenanceMode: false,
      maintenanceMessage:
        "We are currently performing scheduled maintenance. We'll be back soon!",
    });
  }
  return settings;
};

module.exports = mongoose.model("Settings", settingsSchema);
