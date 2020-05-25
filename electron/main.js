"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { is } = require("electron-util");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    is.development
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "index.html")}`
  );

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    if (is.development) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Examples of inter process communication
app.on("ready", () => {
  ipcMain.on("test-main", (event) => {
    mainWindow.webContents.send("test-renderer", app.getVersion());
  });
});
