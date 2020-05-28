const path = require("path");

exports.iconDefault =
  process.platform === "win32"
    ? path.join(__dirname, "..", "resources", "tray", "trayTemplateWindows.png")
    : path.join(__dirname, "..", "resources", "tray", "trayTemplate.png");
