import { ipcRenderer } from "electron";
import { IPCEvents } from "../utils/constants";

const fileAPI = {
  selectOutputPath: async () => await ipcRenderer.invoke(IPCEvents.SELECT_OUTPUT_PATH),
  compressVideo: async (inputPath: string, outputPath: string, size: number) =>
    await ipcRenderer.invoke(IPCEvents.COMPRESS_VIDEO, inputPath, outputPath, size)
};

export default fileAPI;
