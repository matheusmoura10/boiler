import FileReaderInterface from "../interface/file.reader.interface";
import ReaderCSV from "../readers/csv.reader";

export default class FileReaderFactory {
  static createFileReader(fileExtension: string): FileReaderInterface {
    switch (fileExtension) {
      case "csv":
        return new ReaderCSV();

      default:
        throw new Error("Tipo de arquivo não suportado.");
    }
  }
}
