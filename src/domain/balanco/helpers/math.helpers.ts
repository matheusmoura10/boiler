import { parse } from "path";

export default class MathHelpers {
  public static arrendondar(numero: number, casasDecimais?: number): number {
    var negative = false;
    if (casasDecimais === undefined) {
      casasDecimais = 0;
    }
    if (numero < 0) {
      negative = true;
      numero *= -1;
    }
    let multiplicator = Math.pow(10, casasDecimais);
    numero = parseFloat((numero * multiplicator).toFixed(11));
    numero = parseFloat(
      (Math.round(numero) / multiplicator).toFixed(casasDecimais)
    );
    if (negative) {
      numero = parseFloat((numero * -1).toFixed(casasDecimais));
    }
    return numero;
  }
}
