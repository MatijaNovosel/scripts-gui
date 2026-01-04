import { ipcRenderer } from "electron";
import { IPCEvents } from "../../utils/constants";
import { IFileAPI } from "../interfaces/file";

const fileAPI: IFileAPI = {
  getFile: async (path: string) => await ipcRenderer.invoke(IPCEvents.GET_FILE, path),
  compressVideo: async (inputPath: string, outputPath: string, size: number) =>
    await ipcRenderer.invoke(IPCEvents.COMPRESS_VIDEO, inputPath, outputPath, size)
};

export default fileAPI;
