import AnaliseBalancoEntity from "../entities/balanco.analise.entity";
import DesvioCotas from "./resultados/desvios/desvio.cotas";
import ExisteFatura from "./resultados/existe.fatura.resultado";
import InjecaoNegativa from "./resultados/injecao.negativa";
import SemInjecaoResultado from "./resultados/sem.injecao.resultado";

export default class CalculaResultado {
  constructor(private readonly balancoAnalise: AnaliseBalancoEntity) {}

  public calcularResultado() {
    const checkStatusFatura = new ExisteFatura();
    const injecaoNegativa = new InjecaoNegativa();
    const semInjecao = new SemInjecaoResultado();
    const desvioCotas = new DesvioCotas();

    checkStatusFatura.setNext(injecaoNegativa);
    injecaoNegativa.setNext(semInjecao);
    semInjecao.setNext(desvioCotas);

    return checkStatusFatura.calcula(this.balancoAnalise);
  }
}
