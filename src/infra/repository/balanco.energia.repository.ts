import { BaseRepository } from "../../@shared/repository/base.repository";
import { inject, injectable } from "inversify";
import BalancoModel from "../data/models/balanco.model";
import BalancoEnergiaModel from "../data/models/balanco.energia.model";

@injectable()
export default class BalancoEnergiaRepository extends BaseRepository<BalancoEnergiaModel> {
  constructor(@inject("BalancoEnergiaModel") model: BalancoEnergiaModel) {
    super(BalancoEnergiaModel);
  }

  async atualizarOuInserir(model: BalancoEnergiaModel) {
    const balancoExistente = await this.repository.findOne({
      where: {
        referencia: model.referencia,
        fazendaGeracao: {
          id: model.fazendaGeracao.id,
        },
        contaEnergia: {
          id: model.contaEnergia?.id,
        },
        cota: {
          id: model.cota.id,
        },
      },
    });

    if (balancoExistente) {
      model.id = balancoExistente.id;
    }

    return this.repository.save(model);
  }
}
