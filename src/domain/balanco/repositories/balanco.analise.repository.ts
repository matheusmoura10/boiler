import { BaseRepositoryInterface } from "../../../@shared/repository/base.repository";
import BalancoAnaliseModel from "../../../infra/data/models/balanco.analise.model";

export default interface IAnaliseBalancoRepository
  extends BaseRepositoryInterface<BalancoAnaliseModel> {
  atualizarOuInserir(model: BalancoAnaliseModel);
}
