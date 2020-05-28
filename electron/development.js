const {
  default: installExtension,
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

[REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach((extension) => {
  installExtension(extension)
    .then((name) => console.warn(`Added Extension: ${name}`))
    .catch((err) => console.error("An error occurred: ", err));
});

module.exports = (mainWindow) => {
  mainWindow.webContents.openDevTools();
};
