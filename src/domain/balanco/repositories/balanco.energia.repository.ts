import { BaseRepositoryInterface } from "../../../@shared/repository/base.repository";
import BalancoEnergiaModel from "../../../infra/data/models/balanco.energia.model";

export default interface IBalancoEnergiaRepository
  extends BaseRepositoryInterface<BalancoEnergiaModel> {}
