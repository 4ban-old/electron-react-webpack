# electron-react-webpack
The boilerplate for the electron application with configured react and webpack

This template provides an example of the electron application with using React library. Also, there is also a minimal configuration for webpack and electron-builder including features of using ipc.

* Allows to run the app in dev mode with hot reloads for the renderer process
* Allows to build main and renderer processes of the app into one minified, transpiled and optimized code (including the scenario when the renderer process is using the inter process communications with main process (ipcRenderer, ipcMain))
* Allows to use electron-builder package to build a binaries from the built (minified, transpiled and optimized) code.

## Usage
```js
yarn install
```

Development: `yarn run dev`

Build: `yarn run build`

Create binaries: `yarn run package`
