import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";

const App = () => {
  const [version, setVersion] = useState("unknown");
  useEffect(() => {
    // Enable listener
    ipcRenderer.on("test-renderer", (event, version) => {
      setVersion(version);
    });
    // Send event to main process
    ipcRenderer.send("test-main");
  });
  return <div>Hello, I'm an Electron application version: {version}</div>;
};

export default App;
