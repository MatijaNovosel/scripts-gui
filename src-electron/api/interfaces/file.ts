import { IFileSaveModel } from "../../models";

export interface IFileAPI {
  saveFiles: (files: IFileSaveModel[], saveDir: string) => Promise<void>;
  deleteFiles: (path: string[]) => Promise<void>;
  getFile: (path: string) => Promise<string>;
}
