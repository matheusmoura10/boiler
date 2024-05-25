import { ResultadoEnum } from "../../../calcula.resultado.abstract";
import DesvioCotas from "../desvio.cotas";
import { IDesvioStrategy } from "./desvio.strategy.interface";

export default class ManterStrategy implements IDesvioStrategy {
  constructor(private readonly desvios: DesvioCotas) {}
  public verificarDesvio(): ResultadoEnum {
    if (this.desvios.desvioCotaPreciso() || this.desvios.desvioDentro()) {
      return ResultadoEnum.OK;
    }
  }
}
