// @ts-ignore
const { initRemix } = require("../remix-electron-setup/index.cjs");
const { app, BrowserWindow, dialog, session } = require("electron");
const path = require("node:path");

/** @type {BrowserWindow | undefined} */
let win;

/** @param {string} url */
async function createWindow(url) {
  win = new BrowserWindow({ show: false });
  await win.loadURL(url);
  win.show();

  // if (process.env.NODE_ENV === "development") {
  win.webContents.openDevTools();
  // }
}

app.on("ready", () => {
  // Handle permission requests

  void (async () => {
    try {
      // if (process.env.NODE_ENV === "development") {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      await installExtension(REACT_DEVELOPER_TOOLS);
      // }

      const url = await initRemix({
        serverBuild: path.join(__dirname, "../build/index.js"),
      });
      await createWindow(url);
    } catch (error) {
      dialog.showErrorBox("Error", getErrorStack(error));
      console.error(error);
    }
  })();
});

/** @param {unknown} error */
function getErrorStack(error) {
  return error instanceof Error ? error.stack || error.message : String(error);
}
