export interface IFileAPI {
  getFile: (path: string) => Promise<string>;
  compressVideo: (inputPath: string, outputPath: string, size: number) => Promise<void>;
}
