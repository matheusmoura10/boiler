import { BaseRepositoryInterface } from "../../@shared/repository/base.repository";
import CotasModel from "../../infra/data/models/cotas.model";

export default interface ICotasRepository
  extends BaseRepositoryInterface<CotasModel> {
  atualizarOuInserir(cota: CotasModel, condicao: any): Promise<CotasModel>;
  obterCotaPorContratoEData(
    contrato: number,
    referencia: Date
  ): Promise<CotasModel>;
}
