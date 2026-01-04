export interface IElectronAPI {
  compressVideo: (inputPath: string, outputPath: string, size: number) => Promise<void>;
  selectOutputPath: () => Promise<string>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
