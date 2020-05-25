import React, { useEffect } from "react";
import { ipcRenderer } from "electron";

const App = () => {
  useEffect(() => {
    // Enable listener
    ipcRenderer.on("test-renderer", (event, version) => {
      console.log("App version", version);
    });
    // Send event to main process
    ipcRenderer.send("test-main");
  });
  return <div>Hello, I'm an Electron application</div>;
};

export default App;
