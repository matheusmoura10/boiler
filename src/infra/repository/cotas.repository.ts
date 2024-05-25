import { BaseRepository } from "../../@shared/repository/base.repository";
import { inject, injectable } from "inversify";
import CotasModel from "../data/models/cotas.model";
import ICotasRepository from "../../domain/cotas/cotas.repository";
import NotFoundException from "../exceptions/notfound.exception";

@injectable()
export default class CotasRepository
  extends BaseRepository<CotasModel>
  implements ICotasRepository
{
  constructor(@inject("CotasModel") model: CotasModel) {
    super(CotasModel);
  }
  async obterCotaPorContratoEData(
    contrato: number,
    referencia: Date
  ): Promise<CotasModel> {
    const result = await this.repository.findOne({
      where: {
        contrato,
        referencia,
      },
    });

    if (!result) {
      throw new NotFoundException(
        "Cota não encontrada - Contrato: " +
          contrato +
          " - Referência: " +
          referencia
      );
    }

    return result;
  }
  async atualizarOuInserir(cota: CotasModel): Promise<CotasModel> {
    const cotaExistente = await this.repository.findOne({
      where: {
        referencia: cota.referencia,
        contrato: cota.contrato,
        alteracao: cota.alteracao,
        numeroInstalacao: cota.numeroInstalacao,
        numeroInstalacaoFazenda: cota.numeroInstalacaoFazenda,
      },
    });

    if (cotaExistente) {
      cota.id = cotaExistente.id;
    }

    await this.repository.save(cota);

    return Promise.resolve(cota);
  }
}
