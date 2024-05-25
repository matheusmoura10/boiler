import { inject } from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import CotasRepository from "../../../infra/repository/cotas.repository";
import ReaderUsecase from "../reader/reader.usecase";
import { Request, Response } from "express";
import CotasFactory from "../../../domain/cotas/cotas.factory";
import { SALVAR_COTAS_QUEUE } from "../../../infra/queue/queue.config";
import CotasEntity from "../../../domain/cotas/cotas.entity";

export default class UploadCotasUsecase extends UseCase<any, any> {
  private readerUsecase: ReaderUsecase;
  private CotasRepository: CotasRepository;

  constructor(
    @inject("ReaderUsecase") readerUsecase: ReaderUsecase,
    @inject("CotasRepository") CotasRepository: CotasRepository
  ) {
    super();
    this.readerUsecase = readerUsecase;
    this.CotasRepository = CotasRepository;
  }
  async execute(data: { req: Request; res: Response }): Promise<any> {
    const conteudoArquivo = await this.readerUsecase.execute(data.req);
    const entities = CotasFactory.createManyFromCSV(conteudoArquivo);

    entities.forEach(async (entity: CotasEntity) => {
      SALVAR_COTAS_QUEUE.queue.add("upload-cotas", entity as CotasEntity);
    });
  }
}
