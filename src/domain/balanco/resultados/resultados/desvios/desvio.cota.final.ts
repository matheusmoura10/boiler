import { logger } from "../../../../../infra/logger/logger";
import AnaliseBalancoEntity from "../../../entities/balanco.analise.entity";

export default class DesvioCotaFinal {
  constructor(private readonly analiseBalanco: AnaliseBalancoEntity) {}

  public desvioPreciso(): boolean {
    return this.analiseBalanco.getDesvioCotaPercentualFinal() === 0;
  }

  public dentroDoDesvio(): boolean {
    const desvioAbsoluto = Math.abs(
      this.analiseBalanco.getDesvioCotaKwhFinal()
    );
    const desvioRelativo = Math.abs(
      this.analiseBalanco.getDesvioRelativoFinal()
    );

    const desvioCotaFazenda = this.analiseBalanco.getBalanco().getFazenda()
      .getFazenda.getLimiteDesvioCota;
    const tipoDesvioFazenda = this.analiseBalanco.getBalanco().getFazenda()
      .getFazenda.getTipoDesvioCota;

    const dentroDesvioAbsoluto =
      desvioAbsoluto <= desvioCotaFazenda && desvioAbsoluto >= 0;
    const dentroDesvioRelativo =
      desvioRelativo <= desvioCotaFazenda && desvioRelativo >= 0;

    logger.logTable({
      title: "Verificação de desvio cota final",
      headers: ["Desvio Absoluto", "Desvio Relativo", "Dentro do desvio"],
      rows: [
        desvioAbsoluto,
        desvioRelativo,
        dentroDesvioAbsoluto && dentroDesvioRelativo,
      ],
    });

    if (tipoDesvioFazenda === "absoluto") {
      return dentroDesvioAbsoluto;
    }
    if (tipoDesvioFazenda === "relativo") {
      return dentroDesvioRelativo;
    }

    return dentroDesvioAbsoluto && dentroDesvioRelativo;
  }

  public foraDoDesvio(): boolean {
    return !this.dentroDoDesvio();
  }
}
