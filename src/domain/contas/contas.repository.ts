import { BaseRepositoryInterface } from "../../@shared/repository/base.repository";
import ContasModel from "../../infra/data/models/contas.model";

export default interface IContasRepository
  extends BaseRepositoryInterface<ContasModel> {
  findByNumeroInstalacaoAndReferencia(
    numeroInstalacao: string,
    referencia: Date
  ): Promise<ContasModel | null>;
}
