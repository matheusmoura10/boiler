import { BaseRepositoryInterface } from "../../@shared/repository/base.repository";
import { FazendaGeracaoModel } from "../../infra/data/models/fazenda.geracao.model";
import FazendaEntity from "../fazenda/fazenda.entity";

export default interface IFazendaGeracaoRepository
  extends BaseRepositoryInterface<FazendaGeracaoModel> {
  findByFazendaGeracaoReferencia(
    referencia: Date,
    fazendaId: FazendaEntity
  ): Promise<FazendaGeracaoModel | null>;
}
