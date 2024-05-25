import { coerce } from "zod";
import { logger } from "../../../../infra/logger/logger";
import MathHelpers from "../../helpers/math.helpers";

export default class Calculos {
  public static calcularSaldoAtual(
    saldoPreM1: number,
    saldoPosM1: number
  ): number {
    const resultado = saldoPreM1 + saldoPosM1;

    logger.logTable({
      title: "Calculo de saldo atual",
      headers: ["saldoPreM1", "saldoPosM1", "resultado", "funcao literal"],
      rows: [saldoPreM1, saldoPosM1, resultado, "saldoPreM1 + saldoPosM1"],
    });
    return resultado;
  }

  static calcularEnergiaInjetada(
    saldoAtual: number,
    saldoAnterior: number,
    compensadoTotal: number,
    ajusteFonteExterna: number
  ): number {
    const resultado =
      saldoAtual - saldoAnterior + compensadoTotal - ajusteFonteExterna;

    const resultadoRound = MathHelpers.arrendondar(resultado, 5);
    logger.logTable({
      title: "Calculo de energia injetada",
      headers: [
        "saldoAtual",
        "saldoAnterior",
        "compensadoTotal",
        "ajusteFonteExterna",
        "resultado",
        "resultado arredondado",
        "funcao literal",
      ],
      rows: [
        saldoAtual,
        saldoAnterior,
        compensadoTotal,
        ajusteFonteExterna,
        resultado,
        resultadoRound,
        "saldoAtual - saldoAnterior + compensadoTotal - ajusteFonteExterna",
      ],
    });

    return resultado;
  }

  static calcularCota(energiaInjetada: number, fazendaGeracao: number): number {
    let resultado = 0;

    if (fazendaGeracao > 0) {
      resultado = energiaInjetada / fazendaGeracao;
    }

    logger.logTable({
      title: "Calculo de cota",
      headers: [
        "energiaInjetada",
        "fazendaGeracao",
        "resultado",
        "funcao literal",
      ],
      rows: [
        energiaInjetada,
        fazendaGeracao,
        resultado,
        "energiaInjetada / fazendaGeracao",
      ],
    });

    return resultado;
  }

  static deveZerarCpu(
    possuiContaEnergia: boolean,
    saldoSaldoAnterior: number,
    saldoPosCpuAnterior: number,
    saldoAtual: number
  ): boolean {
    const naoPossuiContaEnergia = !possuiContaEnergia;
    const saldoSaldoAnteriorEhZero = saldoSaldoAnterior === 0;
    const saldoPosCpuAnteiorEhMenorIgualZero = saldoPosCpuAnterior <= 0;
    const saldoAnteriorEhMenorSaldoAtual = saldoSaldoAnterior <= saldoAtual;

    logger.logTable({
      title: "Calculo de deve zerar cpu",
      headers: [
        "possuiContaEnergia",
        "saldoSaldoAnterior",
        "saldoPosCpuAnterior",
        "saldoAtual",
        "naoPossuiContaEnergia",
        "saldoSaldoAnteriorEhZero",
        "saldoPosCpuAnteiorEhMenorIgualZero",
        "saldoAnteriorEhMenorSaldoAtual",
        "funcao literal",
      ],
      rows: [
        possuiContaEnergia,
        saldoSaldoAnterior,
        saldoPosCpuAnterior,
        saldoAtual,
        naoPossuiContaEnergia,
        saldoSaldoAnteriorEhZero,
        saldoPosCpuAnteiorEhMenorIgualZero,
        saldoAnteriorEhMenorSaldoAtual,
        "naoPossuiContaEnergia || saldoSaldoAnteriorEhZero || saldoPosCpuAnteiorEhMenorIgualZero || saldoAnteriorEhMenorSaldoAtual",
      ],
    });

    return (
      naoPossuiContaEnergia ||
      saldoSaldoAnteriorEhZero ||
      saldoPosCpuAnteiorEhMenorIgualZero ||
      saldoAnteriorEhMenorSaldoAtual
    );
  }

  static cpuMaiorIgualPosCpuAnterior(
    compensadoTotal: number,
    energiaInjetada: number,
    compensadoRoofTop: number,
    posCpuAnterior: number
  ): boolean {
    let resultado =
      compensadoTotal - energiaInjetada - compensadoRoofTop >= posCpuAnterior;

    logger.logTable({
      title: "Calculo de cpu maior igual pos cpu anterior",
      headers: [
        "compensadoTotal",
        "energiaInjetada",
        "compensadoRoofTop",
        "posCpuAnterior",
        "resultado",
        "funcao literal",
      ],
      rows: [
        compensadoTotal,
        energiaInjetada,
        compensadoRoofTop,
        posCpuAnterior,
        resultado,
        "compensadoTotal - energiaInjetada - compensadoRoofTop >= posCpuAnterior",
      ],
    });

    return resultado;
  }

  static calcularCpukWh(
    compensadoTotal: number,
    energiaInjetada: number,
    compensadoRoofTop: number
  ): number {
    const resultado = compensadoTotal - energiaInjetada - compensadoRoofTop;

    logger.logTable({
      title: "Calculo de cpu kwh",
      headers: [
        "compensadoTotal",
        "energiaInjetada",
        "compensadoRoofTop",
        "resultado",
        "funcao literal",
      ],
      rows: [
        compensadoTotal,
        energiaInjetada,
        compensadoRoofTop,
        resultado,
        "compensadoTotal - energiaInjetada - compensadoRoofTop",
      ],
    });

    return resultado;
  }

  static calcularPosCpu(
    saldoPosCpuAnterior: number,
    kwhCpu: number,
    saldoAtual: number,
    saldoAnterior: number,
    saldoRoofTop: number
  ): number {
    const resultado =
      saldoPosCpuAnterior -
      kwhCpu +
      this.saldoUtilizar(saldoAtual, saldoAnterior, saldoRoofTop);

    logger.logTable({
      title: "Calculo de pos cpu",
      headers: [
        "saldoPosCpuAnterior",
        "kwhCpu",
        "saldoAtual",
        "saldoAnterior",
        "saldoRoofTop",
        "resultado",
        "funcao literal",
      ],
      rows: [
        saldoPosCpuAnterior,
        kwhCpu,
        saldoAtual,
        saldoAnterior,
        saldoRoofTop,
        resultado,
        "saldoPosCpuAnterior - kwhCpu + saldoAtual - saldoUtilizar(saldoAtual, saldoAnterior, saldoRoofTop)",
      ],
    });

    return resultado;
  }

  static saldoUtilizar(
    saldoAtual: number,
    saldoAnterior: number,
    saldoRoofTop: number
  ): number {
    let resultado = 0;

    if (saldoAnterior < saldoAtual - saldoRoofTop) {
      resultado = saldoAtual - saldoAnterior - saldoRoofTop;
    }

    logger.logTable({
      title: "Calculo de saldo a utilizar",
      headers: [
        "saldoAtual",
        "saldoAnterior",
        "saldoRoofTop",
        "resultado",
        "funcao literal",
      ],
      rows: [
        saldoAtual,
        saldoAnterior,
        saldoRoofTop,
        resultado,
        "saldoAtual - saldoAnterior - saldoRoofTop",
      ],
    });

    return 0;
  }

  static calcularPreCpu(saldoAtual: number, posCpu: number): number {
    let resultado = 0;
    const diferenca = saldoAtual - posCpu;

    if (diferenca < 0) {
      resultado = 0;
    }

    logger.logTable({
      title: "Calculo de pre cpu",
      headers: ["saldoAtual", "posCpu", "resultado", "funcao literal"],
      rows: [
        saldoAtual,
        posCpu,
        resultado,
        "saldoAtual - posCpu < 0 ? 0 : saldoAtual - posCpu",
      ],
    });

    return MathHelpers.arrendondar(resultado, 5);
  }

  static calcularEnergiaFaturavel(
    compensadoTotal: number,
    compensadoFonteExterna: number,
    energiaInjetada: number,
    cpu: number
  ): number {
    let resultado = 0;

    let funcaoLiteral = "compensadoTotal - compensadoFonteExterna + cpu";

    resultado = compensadoTotal - compensadoFonteExterna + cpu;

    if (compensadoTotal - compensadoFonteExterna > energiaInjetada) {
      resultado = energiaInjetada + cpu;
      funcaoLiteral = "energiaInjetada + compensadoTotal";
    }

    logger.logTable({
      title: "Calculo de energia faturavel",
      headers: [
        "compensadoTotal",
        "correcaoFonteExterna",
        "energiaInjetada",
        "cpu",
        "resultado",
        "funcao literal",
      ],
      rows: [
        compensadoTotal,
        compensadoFonteExterna,
        energiaInjetada,
        cpu,
        resultado,
        funcaoLiteral,
      ],
    });

    return MathHelpers.arrendondar(resultado, 3);
  }
}
