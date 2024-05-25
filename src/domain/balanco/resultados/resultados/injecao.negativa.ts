import AnaliseBalancoEntity from "../../entities/balanco.analise.entity";
import CalculaResultadoAbstract, {
  ResultadoEnum,
} from "../calcula.resultado.abstract";

export default class InjecaoNegativa extends CalculaResultadoAbstract {
  public calcula(data: AnaliseBalancoEntity): ResultadoEnum {
    if (data.getBalanco().getEnergiaInjetadakWh() < 0) {
      return ResultadoEnum.INJECAO_NEGATIVA;
    }

    return super.calcula(data);
  }
}
