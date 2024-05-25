import { BaseRepository } from "../../@shared/repository/base.repository";
import { inject, injectable } from "inversify";
import BalancoAnaliseModel from "../data/models/balanco.analise.model";
import IAnaliseBalancoRepository from "../../domain/balanco/repositories/balanco.analise.repository";

@injectable()
export default class BalancoAnaliseRepository
  extends BaseRepository<BalancoAnaliseModel>
  implements IAnaliseBalancoRepository
{
  constructor(@inject("BalancoAnaliseModel") model: BalancoAnaliseModel) {
    super(BalancoAnaliseModel);
  }
  async atualizarOuInserir(model: BalancoAnaliseModel): Promise<any> {
    const analiseExistente = await this.repository.findOne({
      where: {
        balanco: {
          id: model.balanco.id,
        },
        cota: {
          id: model.cota.id,
        },
      },
    });

    if (analiseExistente) {
      model.id = analiseExistente.id;
    }

    await this.repository.save(model);

    return await this.repository.findOne({
      where: {
        id: model.id,
      },
      relations: [
        "balanco.fazendaGeracao.fazenda.concessionaria",
        "balanco.contaEnergia",
        "balanco.cota",
      ],
    });
  }
}
