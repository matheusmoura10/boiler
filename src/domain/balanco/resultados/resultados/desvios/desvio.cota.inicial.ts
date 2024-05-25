import AnaliseBalancoEntity from "../../../entities/balanco.analise.entity";

export default class DesvioCotaInicial {
  constructor(private readonly analiseBalanco: AnaliseBalancoEntity) {}

  public desvioPreciso(): boolean {
    return this.analiseBalanco.getDesvioCotaPercentualFinal() === 0;
  }

  public dentroDoDesvio(): boolean {
    const desvioAbsoluto = Math.abs(
      this.analiseBalanco.getDesvioCotaKwhInicial()
    );
    const desvioRelativo = Math.abs(
      this.analiseBalanco.getDesvioRelativoInicial()
    );
    const desvioCotaFazenda = this.analiseBalanco.getBalanco().getFazenda()
      .getFazenda.getLimiteDesvioCota;
    const tipoDesvioFazenda = this.analiseBalanco.getBalanco().getFazenda()
      .getFazenda.getTipoDesvioCota;

    const dentroDesvioAbsoluto =
      desvioAbsoluto <= desvioCotaFazenda && desvioAbsoluto >= 0;
    const dentroDesvioRelativo =
      desvioRelativo <= desvioCotaFazenda && desvioRelativo >= 0;

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
