import AnaliseBalancoEntity from "../../entities/balanco.analise.entity";
import CalculaResultadoAbstract, {
  ResultadoEnum,
} from "../calcula.resultado.abstract";

export default class ExisteFatura extends CalculaResultadoAbstract {
  public calcula(data: AnaliseBalancoEntity): ResultadoEnum {
    if (!data.getBalanco().possuiContaEnergia()) {
      return ResultadoEnum.COTA_RETIDA;
    }

    return super.calcula(data);
  }
}
