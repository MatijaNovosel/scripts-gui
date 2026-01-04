import { ipcRenderer } from "electron";
import { IFileSaveModel } from "../../models";
import { IPCEvents } from "../../utils/constants";
import { IFileAPI } from "../interfaces/file";

const fileAPI: IFileAPI = {
  saveFiles: async (files: IFileSaveModel[], saveDir: string) =>
    ipcRenderer.send(IPCEvents.SAVE_FILES, files, saveDir),
  deleteFiles: async (path: string[]) => ipcRenderer.send(IPCEvents.DELETE_FILES, path),
  getFile: async (path: string) => await ipcRenderer.invoke(IPCEvents.GET_FILE, path)
};

export default fileAPI;
