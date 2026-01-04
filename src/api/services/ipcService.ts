import { IIpcService } from "../interfaces/ipcService";

export class IpcService implements IIpcService {
  async compressVideo(inputPath: string, outputPath: string, size: number): Promise<void> {
    await window.electronAPI.compressVideo(inputPath, outputPath, size);
  }

  /**
   * Retrieves a file from the provided path in base64 format.
   * @param {string} path
   * @returns {string} File in base64 format.
   */
  async getFile(path: string): Promise<string> {
    return await window.electronAPI.getFile(path);
  }
}
