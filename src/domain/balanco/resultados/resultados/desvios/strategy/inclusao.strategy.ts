import { ResultadoEnum } from "../../../calcula.resultado.abstract";
import DesvioCotas from "../desvio.cotas";
import { IDesvioStrategy } from "./desvio.strategy.interface";

export default class InclusaoStrategy implements IDesvioStrategy {
  constructor(private readonly desvios: DesvioCotas) {}
  public verificarDesvio(): ResultadoEnum {
    if (this.desvios.desvioFinalPrecisoOuDentro()) {
      return ResultadoEnum.OK_INCLUSAO;
    }

    if (this.desvios.desvioFinalForaDesvioInicialPreciso()) {
      return ResultadoEnum.INCLUSAO_NAO_PROCESSADA;
    }
  }
}
