import { inject, injectable } from "inversify";
import { BaseRepository } from "../../@shared/repository/base.repository";
import IContasRepository from "../../domain/contas/contas.repository";
import ContasModel from "../data/models/contas.model";

@injectable()
export default class ContasRepository
  extends BaseRepository<ContasModel>
  implements IContasRepository
{
  constructor(@inject("ContasModel") model: ContasModel) {
    super(ContasModel);
  }
  async findByNumeroInstalacaoAndReferencia(
    numeroInstalacao: string,
    referencia: Date
  ): Promise<ContasModel> {
    return await this.repository.findOne({
      where: {
        numeroInstalacao,
        referencia,
      },
    });
  }
}
