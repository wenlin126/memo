import { app, BrowserWindow, protocol } from "electron";
import createProtocol from "umi-plugin-electron-builder/lib/createProtocol";
import path from "path";
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from 'electron-devtools-installer';

const isDevelopment = process.env.NODE_ENV === "development";
let mainWindow: BrowserWindow;

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    transparent: true,
    // frame: false,
  });
  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:31668");
    mainWindow.webContents.openDevTools();
  } else {
    createProtocol("app");
    mainWindow.loadURL("app://./index.html");
  }
  require("./config/menu"); // 清空menu菜单
}

app.on("ready", async () => {
  // if (isDevelopment) {
  //   await installExtension(REACT_DEVELOPER_TOOLS);
  // }
  createWindow();
});

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
