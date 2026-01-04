import { contextBridge } from "electron";
import fileAPI from "./services/file";

contextBridge.exposeInMainWorld("electronAPI", {
  ...fileAPI
});
