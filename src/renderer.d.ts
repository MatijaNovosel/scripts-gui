export interface IElectronAPI {
  getFile: (path: string) => Promise<string>;
  compressVideo: (inputPath: string, outputPath: string, size: number) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
