import { BaseRepository } from "../../@shared/repository/base.repository";
import { inject, injectable } from "inversify";
import BalancoModel from "../data/models/balanco.model";
import IBalancoRepository from "../../domain/balanco/repositories/balanco.repository";

@injectable()
export default class BalancoRepository
  extends BaseRepository<BalancoModel>
  implements IBalancoRepository
{
  constructor(@inject("BalancoModel") model: BalancoModel) {
    super(BalancoModel);
  }
  async atualizarOuCriar(model: BalancoModel): Promise<BalancoModel> {
    const balancoExistente = await this.repository.findOne({
      where: {
        referencia: model.referencia,
        contrato: model.contrato,
        numeroInstalacao: model.numeroInstalacao,
      },
    });

    if (balancoExistente) {
      model.id = balancoExistente.id;
    }

    return Promise.resolve(await this.repository.save(model));
  }
}
