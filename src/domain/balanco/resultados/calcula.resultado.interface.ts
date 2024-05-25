import AnaliseBalancoEntity from "../entities/balanco.analise.entity";
import { ResultadoEnum } from "./calcula.resultado.abstract";

export default interface CalculaResultadoInterface {
  setNext(next: CalculaResultadoInterface): CalculaResultadoInterface;
  calcula(data: AnaliseBalancoEntity): ResultadoEnum;
}
