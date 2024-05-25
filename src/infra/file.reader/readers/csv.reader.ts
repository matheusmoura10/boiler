import * as fs from "fs";
import * as csv from "csv-parser";

import FileReaderInterface from "../interface/file.reader.interface";

export default class ReaderCSV extends FileReaderInterface {
  async readFile(filePath: string): Promise<any> {
    if (!fs.existsSync(filePath)) {
      throw new Error("Arquivo não encontrado.");
    }

    var csvData = [];

    return new Promise((resolve) => {
      fs.createReadStream(filePath)
        .pipe(
          csv({
            separator: ";",
            mapHeaders: ({ header, index }) => this.makeCamelCase(header),
          })
        )
        .on("data", (data) => csvData.push(data))
        .on("end", () => {
          fs.unlinkSync(filePath);
          resolve(csvData);
        })
        .on("error", (error) => {
          fs.unlinkSync(filePath);
          throw new Error("Erro ao ler arquivo CSV.");
        });
    });
  }

  private makeCamelCase(valor: string): string {
    return valor
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }
}
