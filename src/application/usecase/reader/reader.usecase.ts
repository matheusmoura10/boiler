import { Request, Response } from "express";
import FileReaderFactory from "../../../infra/file.reader/factory/file.reader.factory";
import { injectable } from "inversify";

@injectable()
export default class ReaderUsecase {
  async execute(req: Request): Promise<any> {
    const file = req.file?.originalname;

    //empty file
    if (!file) {
      throw new Error("Arquivo não encontrado.");
    }

    const fileExtension = file.split(".").pop()?.toLowerCase();

    const fileReader = FileReaderFactory.createFileReader(fileExtension);
    return await fileReader.readFile(req.file.path);
  }
}
