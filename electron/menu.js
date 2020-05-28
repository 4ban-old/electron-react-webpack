const { app, Menu } = require("electron");

exports.generateAppMenu = (mainWindow) => {
  return Menu.buildFromTemplate([
    { label: app.name + ": " + app.getVersion(), enabled: false },
    { type: "separator" },
    {
      label: "DevTools",
      click: () => {
        mainWindow.webContents.openDevTools();
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);
};
