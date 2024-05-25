import { BaseRepository } from "../../@shared/repository/base.repository";
import { inject, injectable } from "inversify";
import { FazendaModel } from "../data/models/fazenda.model";
import IFazendaGeracaoRepository from "../../domain/fazenda-geracao/fazenda.geracao.repository";
import { FazendaGeracaoModel } from "../data/models/fazenda.geracao.model";
import IFazendaRepository from "../../domain/fazenda/fazenda.repository";
import NotFoundException from "../exceptions/notfound.exception";

@injectable()
export default class FazendaRepository
  extends BaseRepository<FazendaModel>
  implements IFazendaRepository
{
  constructor(@inject("FazendaModel") model: FazendaModel) {
    super(FazendaModel);
  }
  async findByFazendaNumeroInstacao(
    numeroInstalacao: string
  ): Promise<FazendaModel> {
    const result = await this.repository.findOne({
      where: { numeroInstalacao },
      relations: ["concessionaria"],
    });

    if (!result) {
      throw new NotFoundException(
        "Fazenda não encontrada: " + numeroInstalacao
      );
    }

    return result;
  }
}
