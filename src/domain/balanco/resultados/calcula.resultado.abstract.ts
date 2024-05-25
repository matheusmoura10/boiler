import AnaliseBalancoEntity from "../entities/balanco.analise.entity";
import CalculaResultadoInterface from "./calcula.resultado.interface";

export enum ResultadoEnum {
  ANALISAR = "ANALISAR",
  COTA_RETIDA = "COTA_RETIDA",
  INJECAO_NEGATIVA = "INJECAO_NEGATIVA",
  INCLUSAO_NAO_PROCESSADA = "INCLUSAO_NAO_PROCESSADA",
  OK_EXCLUSAO = "OK_EXCLUSAO",
  SEM_INJECAO = "SEM_INJECAO",
  OK_INCLUSAO = "OK_INCLUSAO",
  EXCLUSAO_NAO_PROCESSADA = "EXCLUSAO_NAO_PROCESSADA",
  OK_AJUSTE = "OK_AJUSTE",
  AJUSTE_NAO_PROCESSADO = "AJUSTE_NAO_PROCESSADO",
  OK = "OK",
}

export default abstract class CalculaResultadoAbstract
  implements CalculaResultadoInterface
{
  private next: CalculaResultadoInterface;

  setNext(next: CalculaResultadoInterface): CalculaResultadoInterface {
    this.next = next;

    return next;
  }

  calcula(data: AnaliseBalancoEntity): ResultadoEnum {
    if (this.next) {
      return this.next.calcula(data);
    }

    return ResultadoEnum.ANALISAR;
  }
}
