import AnaliseBalancoEntity from "../../entities/balanco.analise.entity";
import CalculaResultadoAbstract, {
  ResultadoEnum,
} from "../calcula.resultado.abstract";

export enum AlteracoesEnum {
  INCLUIR = "INCLUIR",
  MANTER = "MANTER",
  ALTERACAO_DE_COTA = "ALTERACAO DE COTA",
  EXCLUIR = "EXCLUIR",
}

export default class SemInjecaoResultado extends CalculaResultadoAbstract {
  public calcula(data: AnaliseBalancoEntity): ResultadoEnum {
    const alteracao = data.getBalanco().getCota().getAlteracao();
    const energiaInjetada = data.getBalanco().getEnergiaInjetadakWh();

    if (energiaInjetada === 0) {
      switch (alteracao) {
        case AlteracoesEnum.INCLUIR:
          return ResultadoEnum.INCLUSAO_NAO_PROCESSADA;
        case AlteracoesEnum.EXCLUIR:
          return ResultadoEnum.OK_EXCLUSAO;
        default:
          return ResultadoEnum.SEM_INJECAO;
      }
    }

    return super.calcula(data);
  }
}
