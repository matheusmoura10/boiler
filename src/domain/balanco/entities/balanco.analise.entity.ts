import BalancoEnergiaEntity from "./balanco.energia.entity";
import MathHelpers from "../helpers/math.helpers";
import { logger } from "../../../infra/logger/logger";
import { BaseEntity } from "../../../@shared/entities/base.entity";

export default class AnaliseBalancoEntity extends BaseEntity {
  private readonly desvioCotaPercentualFinal: number = 0;
  private readonly desvioCotaPercentualInicial: number = 0;
  private readonly desvioCotaKwhFinal: number = 0;
  private readonly desvioCotaKwhInicial: number = 0;
  private readonly kwhTotalFinal: number = 0;
  private readonly kwhTotalInicial: number = 0;
  private readonly desvioRelativoFinal: number = 0;
  private readonly desvioRelativoInicial: number = 0;

  constructor(private readonly balanco: BalancoEnergiaEntity, id: string) {
    super(id);
    this.desvioCotaPercentualFinal = this.calcularDesvioCotaPercentualFinal();
    this.desvioCotaPercentualInicial =
      this.calcularDesvioCotaPercentualInicial();
    this.desvioCotaKwhFinal = this.calcularDesvioCotaKwhFinal();
    this.desvioCotaKwhInicial = this.calcularDesvioCotaKwhInicial();
    this.kwhTotalFinal = this.calcularKwhTotalFinal();
    this.kwhTotalInicial = this.calcularKwhTotalInicial();
    this.desvioRelativoFinal = this.calcularDesvioRelativoFinal();
    this.desvioRelativoInicial = this.calcularDesvioRelativoInicial();

    console.log("AnaliseBalancoEntity", this);
  }

  static calcular(
    balanco: BalancoEnergiaEntity,
    id: string
  ): AnaliseBalancoEntity {
    return new AnaliseBalancoEntity(balanco, id);
  }

  private calcularDesvioCotaPercentualFinal(): number {
    if (!this.balanco.possuiContaEnergia()) {
      return 0;
    }

    const cotaCalculada = this.balanco.getCotaCalculada();
    const cotaFinal = this.balanco.getCota().getCotaFinal();

    const resultado = cotaCalculada - cotaFinal;
    const resultadoArredondado = MathHelpers.arrendondar(resultado, 5);

    logger.logTable({
      title: "Calculo de desvio cota percentual final",
      headers: [
        "cotaCalculada",
        "cotaFinal",
        "resultado",
        "resultado arredondado",
        "funcao literal",
      ],
      rows: [
        cotaCalculada,
        cotaFinal,
        resultado,
        resultadoArredondado,
        "cotaCalculada - cotaFinal",
      ],
    });

    return resultadoArredondado;
  }

  private calcularDesvioCotaPercentualInicial(): number {
    if (!this.balanco.possuiContaEnergia()) {
      return 0;
    }

    const cotaCalculada = this.balanco.getCotaCalculada();
    const cotaInicial = this.balanco.getCota().getCotaAtual();

    const resultado = cotaCalculada - cotaInicial;
    const resultadoArredondado = MathHelpers.arrendondar(resultado, 5);

    logger.logTable({
      title: "Calculo de desvio cota percentual inicial",
      headers: [
        "cotaCalculada",
        "cotaInicial",
        "resultado",
        "resultado arredondado",
        "funcao literal",
      ],
      rows: [
        cotaCalculada,
        cotaInicial,
        resultado,
        resultadoArredondado,
        "cotaCalculada - cotaInicial",
      ],
    });

    return resultadoArredondado;
  }

  private calcularDesvioCotaKwhFinal(): number {
    if (!this.balanco.possuiContaEnergia()) {
      return 0;
    }

    const { desvioCotaPercentualFinal } = this;
    const geracaoFazenda = this.balanco.getFazenda().calcularGeracaoLiquida();

    const resultado = desvioCotaPercentualFinal * geracaoFazenda;
    const resultadoArredondado = MathHelpers.arrendondar(resultado, 5);

    logger.logTable({
      title: "Calculo de desvio cota kwh final",
      headers: [
        "desvioCotaPercentualFinal",
        "geracaoFazenda",
        "resultado",
        "resultado arredondado",
        "funcao literal",
      ],
      rows: [
        desvioCotaPercentualFinal,
        geracaoFazenda,
        resultado,
        resultadoArredondado,
        "desvioCotaPercentualFinal * geracaoFazenda",
      ],
    });

    return resultadoArredondado;
  }

  private calcularDesvioCotaKwhInicial(): number {
    if (!this.balanco.possuiContaEnergia()) {
      return 0;
    }

    const { desvioCotaPercentualInicial } = this;
    const geracaoFazenda = this.balanco.getFazenda().calcularGeracaoLiquida();

    const resultado = desvioCotaPercentualInicial * geracaoFazenda;

    logger.logTable({
      title: "Calculo de desvio cota kwh inicial",
      headers: [
        "desvioCotaPercentualInicial",
        "geracaoFazenda",
        "resultado",
        "funcao literal",
      ],
      rows: [
        desvioCotaPercentualInicial,
        geracaoFazenda,
        resultado,
        "desvioCotaPercentualInicial * geracaoFazenda",
      ],
    });

    return resultado;
  }

  private calcularKwhTotalFinal(): number {
    if (!this.balanco.possuiContaEnergia()) {
      return 0;
    }

    const energiaInjetada = this.balanco.getEnergiaInjetadakWh();
    const { desvioCotaKwhFinal } = this;

    const resultado = energiaInjetada - desvioCotaKwhFinal;

    logger.logTable({
      title: "Calculo de kwh total final",
      headers: [
        "energiaInjetada",
        "desvioCotaKwhFinal",
        "resultado",
        "funcao literal",
      ],
      rows: [
        energiaInjetada,
        desvioCotaKwhFinal,
        resultado,
        "energiaInjetada - desvioCotaKwhFinal",
      ],
    });

    return resultado;
  }

  private calcularKwhTotalInicial(): number {
    if (!this.balanco.possuiContaEnergia()) {
      return 0;
    }

    const energiaInjetada = this.balanco.getEnergiaInjetadakWh();
    const { desvioCotaKwhInicial } = this;

    const resultado = energiaInjetada - desvioCotaKwhInicial;

    logger.logTable({
      title: "Calculo de kwh total inicial",
      headers: [
        "energiaInjetada",
        "desvioCotaKwhInicial",
        "resultado",
        "funcao literal",
      ],
      rows: [
        energiaInjetada,
        desvioCotaKwhInicial,
        resultado,
        "energiaInjetada - desvioCotaKwhInicial",
      ],
    });

    return resultado;
  }

  private calcularDesvioRelativoFinal(): number {
    if (!this.balanco.possuiContaEnergia()) {
      return 0;
    }

    const cotaFinal = this.balanco.getCota().getCotaFinal();
    const energiaInjetada = this.balanco.getEnergiaInjetadakWh();
    const { kwhTotalFinal } = this;

    if (cotaFinal === 0 || kwhTotalFinal === 0) {
      return 0;
    }

    const resultado = (energiaInjetada - kwhTotalFinal) / kwhTotalFinal;
    const resultadoAbsoluto = Math.abs(resultado);
    const resultadoArredondado = MathHelpers.arrendondar(resultadoAbsoluto, 5);

    logger.logTable({
      title: "Calculo de desvio relativo final",
      headers: [
        "cotaFinal",
        "energiaInjetada",
        "kwhTotalFinal",
        "resultado",
        "resultado absoluto",
        "resultado arredondado",
        "funcao literal",
      ],
      rows: [
        cotaFinal,
        energiaInjetada,
        kwhTotalFinal,
        resultado,
        resultadoAbsoluto,
        resultadoArredondado,
        "(energiaInjetada - kwhTotalFinal) / kwhTotalFinal",
      ],
    });

    return resultadoArredondado;
  }

  private calcularDesvioRelativoInicial(): number {
    if (!this.balanco.possuiContaEnergia()) {
      return 0;
    }

    const cotaInicial = this.balanco.getCota().getCotaAtual();
    const energiaInjetada = this.balanco.getEnergiaInjetadakWh();
    const { kwhTotalInicial } = this;

    if (cotaInicial === 0 || kwhTotalInicial === 0) {
      return 0;
    }

    const resultado = (energiaInjetada - kwhTotalInicial) / kwhTotalInicial;
    const resultadoAbsoluto = Math.abs(resultado);
    const resultadoArredondado = MathHelpers.arrendondar(resultadoAbsoluto, 5);

    logger.logTable({
      title: "Calculo de desvio relativo inicial",
      headers: [
        "cotaInicial",
        "energiaInjetada",
        "kwhTotalInicial",
        "resultado",
        "resultado absoluto",
        "resultado arredondado",
        "funcao literal",
      ],
      rows: [
        cotaInicial,
        energiaInjetada,
        kwhTotalInicial,
        resultado,
        resultadoAbsoluto,
        resultadoArredondado,
        "(energiaInjetada - kwhTotalInicial) / kwhTotalInicial",
      ],
    });

    return resultadoArredondado;
  }

  validar(): void {
    throw new Error("Method not implemented.");
  }

  getDesvioCotaPercentualFinal(): number {
    return this.desvioCotaPercentualFinal;
  }

  getDesvioCotaPercentualInicial(): number {
    return this.desvioCotaPercentualInicial;
  }

  getDesvioCotaKwhFinal(): number {
    return this.desvioCotaKwhFinal;
  }

  getDesvioCotaKwhInicial(): number {
    return this.desvioCotaKwhInicial;
  }

  getKwhTotalFinal(): number {
    return this.kwhTotalFinal;
  }

  getKwhTotalInicial(): number {
    return this.kwhTotalInicial;
  }

  getDesvioRelativoFinal(): number {
    return this.desvioRelativoFinal;
  }

  getDesvioRelativoInicial(): number {
    return this.desvioRelativoInicial;
  }

  getBalanco(): BalancoEnergiaEntity {
    return this.balanco;
  }
}
