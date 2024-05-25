import { BaseRepositoryInterface } from "../../../@shared/repository/base.repository";
import BalancoModel from "../../../infra/data/models/balanco.model";

export default interface IBalancoRepository
  extends BaseRepositoryInterface<BalancoModel> {
  atualizarOuCriar(model: BalancoModel);
}
