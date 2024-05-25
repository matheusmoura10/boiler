import BalancoModel from "../../../infra/data/models/balanco.model";
import ContaFactory from "../../contas/conta.factory";
import BalancoEntiy from "../entities/balanco.entity";
import { v4 as uuid } from "uuid";
import BalancoEnergiaFactory from "./balanco.energia.factory";
import BalancoAnaliseFactory from "../calculos/analise.balanco.factory";
import FazendaGeracaoFactory from "../../fazenda-geracao/fazenda.geracao.factory";
import CotasFactory from "../../cotas/cotas.factory";
export default class BalancoFactory {
  static criar({
    referencia,
    contrato,
    numeroInstalacao,
    dadosExternos,
    energia,
    analise,

    fazendaGeracao,
    cota,
    contaEnergia,
    balancoAnterior,
    resultadoBalanco,
    possuiConta,
  }) {
    return new BalancoEntiy(
      uuid(),
      referencia,
      contrato,
      numeroInstalacao,
      dadosExternos,
      energia,
      analise,
      fazendaGeracao,
      cota,
      contaEnergia,
      balancoAnterior,
      resultadoBalanco,
      possuiConta
    );
  }

  static entityToModel(input: BalancoEntiy) {
    const model = new BalancoModel();
    model.id = input.getId;
    model.referencia = input.getReferencia();
    model.contrato = input.getContrato();
    model.numeroInstalacao = input.getNumeroInstalacao();
    model.dadosExternos = null;
    model.energia = BalancoEnergiaFactory.toModel(input.getEnergia());
    model.analise = BalancoAnaliseFactory.criarModel(input.getAnalise());
    model.fazendaGeracao = FazendaGeracaoFactory.entityToModel(
      input.getFazendaGeracao()
    );
    model.cota = CotasFactory.toModel(input.getCota());
    model.balancoAnterior = null;
    model.resultadoBalanco = input.getResultadoBalanco();
    model.possuiConta = input.getPossuiConta();

    if (input.getPossuiConta()) {
      model.contaEnergia = ContaFactory.toModel(input.getContaEnergia());
    }

    return model;
  }
}
