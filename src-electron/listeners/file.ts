import { ipcMain } from "electron";
import fs from "fs";
import { IPCEvents } from "../utils/constants";

export const registerFileListeners = () => {
  ipcMain.handle(IPCEvents.GET_FILE, (event, path: string) => {
    if (fs.existsSync(path)) {
      const base64 = fs.readFileSync(path, { encoding: "base64" });
      return base64;
    }
    throw new Error("File does not exist!");
  });
};
