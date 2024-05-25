import AnaliseBalancoEntity from "../../../entities/balanco.analise.entity";
import CalculaResultadoAbstract, {
  ResultadoEnum,
} from "../../calcula.resultado.abstract";
import { AlteracoesEnum } from "../sem.injecao.resultado";
import DesvioCotaFinal from "./desvio.cota.final";
import DesvioCotaInicial from "./desvio.cota.inicial";
import AlteracaoStrategy from "./strategy/alteracao.strategy";
import { IDesvioStrategy } from "./strategy/desvio.strategy.interface";
import ExclusaoStrategy from "./strategy/exclusao.strategy";
import InclusaoStrategy from "./strategy/inclusao.strategy";
import ManterStrategy from "./strategy/manter.strategy";

export default class DesvioCotas extends CalculaResultadoAbstract {
  private desvioDeCotaFinal: DesvioCotaFinal;
  private desvioCotaInicial: DesvioCotaInicial;

  public calcula(data: AnaliseBalancoEntity): ResultadoEnum {
    this.desvioDeCotaFinal = new DesvioCotaFinal(data);
    this.desvioCotaInicial = new DesvioCotaInicial(data);
    const alteracao = data
      .getBalanco()
      .getCota()
      .getAlteracao() as AlteracoesEnum;

    const estrategia = this.obterEstrategia(alteracao);

    if (estrategia) {
      const result = estrategia.verificarDesvio();

      if (!result) {
        return super.calcula(data);
      }

      return result;
    }

    return super.calcula(data);
  }

  protected obterEstrategia(alteracao: AlteracoesEnum): IDesvioStrategy {
    switch (alteracao) {
      case AlteracoesEnum.INCLUIR:
        return new InclusaoStrategy(this);
      case AlteracoesEnum.EXCLUIR:
        return new ExclusaoStrategy(this);
      case AlteracoesEnum.ALTERACAO_DE_COTA:
        return new AlteracaoStrategy(this);
      case AlteracoesEnum.MANTER:
        return new ManterStrategy(this);
      default:
        return null;
    }
  }

  public desvioFinalForaDesvioInicialPreciso(): boolean {
    return (
      this.desvioDeCotaFinal.foraDoDesvio() &&
      this.desvioCotaInicial.desvioPreciso()
    );
  }
  public desvioFinalForaDesvioInicialDentro(): boolean {
    return (
      this.desvioDeCotaFinal.foraDoDesvio() &&
      this.desvioCotaInicial.dentroDoDesvio()
    );
  }
  public desvioCotaPreciso(): boolean {
    return (
      this.desvioDeCotaFinal.desvioPreciso() &&
      this.desvioCotaInicial.desvioPreciso()
    );
  }
  public desvioDentro(): boolean {
    return (
      this.desvioDeCotaFinal.dentroDoDesvio() &&
      this.desvioCotaInicial.dentroDoDesvio()
    );
  }
  public desvioFinalPrecisoOuDentro(): boolean {
    return (
      this.desvioDeCotaFinal.desvioPreciso() ||
      this.desvioDeCotaFinal.dentroDoDesvio()
    );
  }
}
