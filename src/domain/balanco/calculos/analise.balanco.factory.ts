import BalancoAnaliseModel from "../../../infra/data/models/balanco.analise.model";
import CotasFactory from "../../cotas/cotas.factory";
import BalancoEnergiaEntity from "../entities/balanco.energia.entity";
import BalancoEnergiaFactory from "../factories/balanco.energia.factory";
import AnaliseBalancoEntity from "../entities/balanco.analise.entity";
import { v4 as uuid } from "uuid";
export default class BalancoAnaliseFactory {
  static criarAnaliseBalanco(
    balanco: BalancoEnergiaEntity
  ): AnaliseBalancoEntity {
    return new AnaliseBalancoEntity(balanco, uuid());
  }

  static criarAnaliseBalancoComId(
    balanco: BalancoEnergiaEntity,
    id: string
  ): AnaliseBalancoEntity {
    return new AnaliseBalancoEntity(balanco, id);
  }

  static criarModel(entity: AnaliseBalancoEntity): BalancoAnaliseModel {
    const model = new BalancoAnaliseModel();
    model.id = entity.getId;
    model.balanco = BalancoEnergiaFactory.toModel(entity.getBalanco());
    model.cota = CotasFactory.toModel(entity.getBalanco().getCota());
    model.desvioCotaPercentualFinal = entity.getDesvioCotaPercentualFinal();
    model.desvioCotaPercentualInicial = entity.getDesvioCotaPercentualInicial();
    model.desvioCotaKwhFinal = entity.getDesvioCotaKwhFinal();
    model.desvioCotaKwhInicial = entity.getDesvioCotaKwhInicial();
    model.kwhTotalFinal = entity.getKwhTotalFinal();
    model.kwhTotalInicial = entity.getKwhTotalInicial();
    model.desvioRelativoFinal = entity.getDesvioRelativoFinal();
    model.desvioRelativoInicial = entity.getDesvioRelativoInicial();

    return model;
  }

  static async toEntity(
    result: BalancoAnaliseModel
  ): Promise<AnaliseBalancoEntity> {
    const balancoEntity = await BalancoEnergiaFactory.toEntity(result.balanco);

    return new AnaliseBalancoEntity(balancoEntity, result.id);
  }
}
