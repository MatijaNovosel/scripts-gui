import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import { release } from "node:os";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { registerFileListeners } from "./listeners/file";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

const platform = process.platform || os.platform();
const currentDir = fileURLToPath(new URL(".", import.meta.url));
const url = process.env.APP_URL as string;

const preload = path.resolve(__dirname, "../preload/electron-preload.js");

const isDev = !app.isPackaged;
const __dirnameMain = path.dirname(fileURLToPath(import.meta.url));
const rendererDist = path.resolve(__dirnameMain, "../../dist");
const indexHtml = path.join(rendererDist, "index.html");

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Scripts GUI",
    icon: path.resolve(currentDir, "icons/icon.png"),
    width: 1280,
    height: 720,
    useContentSize: true,
    webPreferences: {
      webSecurity: false,
      contextIsolation: true,
      preload
    }
  });

  // Keyboard shortcuts
  globalShortcut.register("F5", () => {
    mainWindow?.webContents.reload();
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(indexHtml);
  }

  mainWindow.webContents.on("did-finish-load", async () => {
    registerFileListeners();
  });

  mainWindow.on("closed", () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.commandLine.appendSwitch("ignore-certificate-errors");
app.commandLine.appendSwitch("allow-insecure-localhost", "true");

ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  childWindow.loadURL(`${url}#${arg}`);
});
