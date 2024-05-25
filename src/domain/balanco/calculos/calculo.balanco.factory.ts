import ContaEntity from "../../contas/conta.entity";
import BalancoEnergiaEntity from "../entities/balanco.energia.entity";
import AbstractCalculoBalanco from "./abstract.calculo.balanco";
import Normal from "./tipos/normaL";

export default class CalculoBalancoFactory {
  static obterClasseParaCalculo(
    balanco: BalancoEnergiaEntity
  ): AbstractCalculoBalanco {
    const { getEnergiaRoofTopkWh, getCompensadoRoofTopkWh } =
      balanco.getContaEnergia() || ({} as ContaEntity);

    // if (getEnergiaRoofTopkWh > 0 && getCompensadoRoofTopkWh > 0) {
    // }

    // if (getEnergiaRoofTopkWh == 0 && getCompensadoRoofTopkWh > 0) {
    // }

    // if (getEnergiaRoofTopkWh > 0 && getCompensadoRoofTopkWh > 0) {
    // }

    // if (getEnergiaRoofTopkWh == 0 && getCompensadoRoofTopkWh == 0) {
    // }

    return new Normal(balanco);
  }
}
