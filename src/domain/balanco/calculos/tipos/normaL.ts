import AbstractCalculoBalanco from "../abstract.calculo.balanco";
import { logger } from "../../../../infra/logger/logger";

export default class Normal extends AbstractCalculoBalanco {
  constructor(balanco) {
    super(balanco);
  }

  calcularAjusteFonteExternakWh(): number {
    logger.logTable({
      title: "Calculo de ajuste de fonte externa",
      headers: ["ajusteFonteExterna"],
      rows: [0],
    });
    return 0;
  }

  calcularSaldoRoofTop(): number {
    logger.logTable({
      title: "Calculo de saldo roof top",
      headers: ["saldoRoofTop"],
      rows: [0],
    });
    return 0;
  }

  calcularCompensadoFonteExternakWh(): number {
    logger.logTable({
      title: "Calculo de compensado de fonte externa",
      headers: ["compensadoFonteExterna"],
      rows: [0],
    });
    return 0;
  }

  calcularEnergiaNaoIsentakWh(): number {
    logger.logTable({
      title: "Calculo de energia não isenta",
      headers: ["energiaNaoIsenta"],
      rows: [0],
    });
    return 0;
  }

  calcularEnergiaCompensadaRoofTopkWh(): number {
    logger.logTable({
      title: "Calculo de energia compensada roof top",
      headers: ["energiaCompensadaRoofTop"],
      rows: [0],
    });
    return 0;
  }

  calcularEnergiaInjetadaRoofTopkWh(): number {
    logger.logTable({
      title: "Calculo de energia injetada roof top",
      headers: ["energiaInjetadaRoofTop"],
      rows: [0],
    });
    return 0;
  }
}
