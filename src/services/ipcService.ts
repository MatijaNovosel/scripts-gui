export class IpcService {
  async compressVideo(inputPath: string, outputPath: string, size: number): Promise<void> {
    await window.electronAPI.compressVideo(inputPath, outputPath, size);
  }

  async selectOutputPath(): Promise<string> {
    return window.electronAPI.selectOutputPath();
  }
}
