import { contextBridge } from "electron";
import fileAPI from "./api/services/file";

contextBridge.exposeInMainWorld("electronAPI", {
  ...fileAPI
});
