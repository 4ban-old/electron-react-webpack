"use strict";

const { app, BrowserWindow, ipcMain, Tray, nativeImage } = require("electron");
const path = require("path");
const { is } = require("electron-util");

const { iconDefault } = require("./constants");
const { generateAppMenu } = require("./menu");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    frame: false,
    show: false,
    resizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    webPreferences: {
      backgroundThrottling: false,
      overlayScrollbars: true,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    is.development
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "..", "build", "index.html")}`
  );

  if (process.platform === "darwin") {
    app.dock.hide();
  }

  mainWindow.on("closed", () => {
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

app.on("browser-window-blur", (event, win) => {
  mainWindow.hide();
});

// Suggest to use https://github.com/maxogden/menubar
let tray = null;
app.on("ready", () => {
  tray = new Tray(nativeImage.createFromPath(iconDefault));
  tray.setIgnoreDoubleClickEvents(true);
  tray.setToolTip(app.name);
  tray.on("click", (event, bounds) => {
    const { x, y } = bounds;
    const { height, width } = mainWindow.getBounds();
    toggleWindow(x, y, height, width);
  });
  tray.on("right-click", (event) => {
    tray.popUpContextMenu(generateAppMenu(mainWindow));
  });
});

// Examples of inter process communication
app.on("ready", () => {
  ipcMain.on("test-main", (event) => {
    mainWindow.webContents.send("test-renderer", app.getVersion());
  });
});

const toggleWindow = (x, y, height, width) => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    const yPosition = process.platform === "darwin" ? y : y - height;
    mainWindow.setBounds({
      x: x - width / 2,
      y: yPosition,
      height,
      width,
    });
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.show();
    mainWindow.setVisibleOnAllWorkspaces(false);
  }
};

app.on("ready", () => {
  if (is.development) require("./development")(mainWindow);
});
