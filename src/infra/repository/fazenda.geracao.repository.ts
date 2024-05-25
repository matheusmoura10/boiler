import { BaseRepository } from "../../@shared/repository/base.repository";
import { inject, injectable } from "inversify";
import { FazendaGeracaoModel } from "../data/models/fazenda.geracao.model";
import IFazendaGeracaoRepository from "../../domain/fazenda-geracao/fazenda.geracao.repository";
import NotFoundException from "../exceptions/notfound.exception";
import FazendaEntity from "../../domain/fazenda/fazenda.entity";

@injectable()
export default class FazendaGeracaoRepository
  extends BaseRepository<FazendaGeracaoModel>
  implements IFazendaGeracaoRepository
{
  constructor(@inject("FazendaGeracaoModel") model: FazendaGeracaoModel) {
    super(FazendaGeracaoModel);
  }
  async findByFazendaGeracaoReferencia(
    referencia: Date,
    fazenda: FazendaEntity
  ): Promise<FazendaGeracaoModel> {
    const result = await this.findByOne(
      {
        referencia,
        fazenda: {
          id: fazenda.getId,
        },
      },
      ["fazenda.concessionaria"]
    );

    if (!result) {
      throw new NotFoundException(
        "Não foi possível encontrar geração da fazenda: " +
          fazenda.getNumeroInstalacao +
          " - Referência: " +
          referencia
      );
    }
    return result;
  }
}
