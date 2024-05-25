import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import ReaderUsecase from "../../application/usecase/reader/reader.usecase";
import CotasFactory from "../../domain/cotas/cotas.factory";
import CotasRepository from "../../infra/repository/cotas.repository";
import UploadCotasUsecase from "../../application/usecase/payload.cotas/upload.cotas.usecase";

@injectable()
export default class PayloadCotasController {


  constructor(
    @inject("UploadCotasUsecase") private uploadCotasUsecase: UploadCotasUsecase,
  ) {}

  async cargaCotas(req: Request, res: Response) {
    try {
    
      await this.uploadCotasUsecase.execute({ req, res });
      res.status(200).json({ message: "Carga de cotas realizada com sucesso." });

    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: Error) {
    res.status(400).json({ error: error.message });
  }
}
