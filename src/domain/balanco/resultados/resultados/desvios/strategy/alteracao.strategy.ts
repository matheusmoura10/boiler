import { ResultadoEnum } from "../../../calcula.resultado.abstract";
import DesvioCotas from "../desvio.cotas";
import { IDesvioStrategy } from "./desvio.strategy.interface";

export default class AlteracaoStrategy implements IDesvioStrategy {
  constructor(private readonly desvios: DesvioCotas) {}
  public verificarDesvio(): ResultadoEnum {
    if (this.desvios.desvioFinalPrecisoOuDentro()) {
      return ResultadoEnum.OK_AJUSTE;
    }

    if (
      this.desvios.desvioFinalForaDesvioInicialPreciso() ||
      this.desvios.desvioFinalForaDesvioInicialDentro()
    ) {
      return ResultadoEnum.AJUSTE_NAO_PROCESSADO;
    }
  }
}
