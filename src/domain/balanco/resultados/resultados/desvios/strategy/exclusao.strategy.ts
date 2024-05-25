import { ResultadoEnum } from "../../../calcula.resultado.abstract";
import DesvioCotas from "../desvio.cotas";
import { IDesvioStrategy } from "./desvio.strategy.interface";

export default class ExclusaoStrategy implements IDesvioStrategy {
  constructor(private readonly desvios: DesvioCotas) {}
  public verificarDesvio(): ResultadoEnum {
    if (this.desvios.desvioCotaPreciso()) {
      return ResultadoEnum.OK_EXCLUSAO;
    }

    if (
      this.desvios.desvioFinalForaDesvioInicialPreciso() ||
      this.desvios.desvioFinalForaDesvioInicialPreciso() ||
      this.desvios.desvioDentro()
    ) {
      return ResultadoEnum.EXCLUSAO_NAO_PROCESSADA;
    }
  }
}
