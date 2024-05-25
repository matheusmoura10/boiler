import FazendaFactory, { FazendaPropsId } from "../fazenda/fazenda.factory";
import { v4 as uuid } from "uuid";
import FazendaGeracaoEntity from "./fazenda.geracao.entity";
import { FazendaGeracaoModel } from "../../infra/data/models/fazenda.geracao.model";
import ConcessionariaFactory from "../concessionaria/concessionaria.factory";

export interface FazendaGeracaoProps {
  referencia: Date;
  fazenda: FazendaPropsId;
  dataLeitura: Date;
  demandaKwH: number;
  tarifaDemanda: number;
  energiaInjetadaHFP: number;
  autoConsumoHFP: number;
  saldoGeracaoHFP: number;
  energiaInjetadaHP: number;
  autoConsumoHP: number;
  saldoGeracaoHP: number;
}

export interface FazendaGeracaoPropsId extends FazendaGeracaoProps {
  id: string;
}

export default class FazendaGeracaoFactory {
  static modelToEntity(
    fazendaGeracao: FazendaGeracaoModel
  ): FazendaGeracaoEntity {
    return new FazendaGeracaoEntity(
      fazendaGeracao.id,
      fazendaGeracao.referencia,
      FazendaFactory.modelToEntity(fazendaGeracao.fazenda),
      fazendaGeracao.dataLeitura,
      fazendaGeracao.demandaKwH,
      fazendaGeracao.tarifaDemanda,
      fazendaGeracao.energiaInjetadaHFP,
      fazendaGeracao.autoConsumoHFP,
      fazendaGeracao.saldoGeracaoHFP,
      fazendaGeracao.energiaInjetadaHP,
      fazendaGeracao.autoConsumoHP,
      fazendaGeracao.saldoGeracaoHP,
      fazendaGeracao.geracaoLiquida ?? 0
    );
  }
  static entityToModel(entity: FazendaGeracaoEntity): FazendaGeracaoModel {
    const fazendaModel = FazendaFactory.entityToModel(entity.getFazenda);
    const concessionariaModel = ConcessionariaFactory.entityToModel(
      entity.getFazenda.getConcessionaria
    );

    const model = new FazendaGeracaoModel();
    model.id = entity.getId;
    model.referencia = entity.getReferencia;
    model.dataLeitura = entity.getDataLeitura;
    model.demandaKwH = entity.getDemandaKwh;
    model.tarifaDemanda = entity.getTarifaDemanda;
    model.energiaInjetadaHFP = entity.getEnergiaInjetadaHFP;
    model.autoConsumoHFP = entity.getAutoConsumoHFP;
    model.saldoGeracaoHFP = entity.getSaldoGeracaoHFP;
    model.energiaInjetadaHP = entity.getEnergiaInjetadaHP;
    model.autoConsumoHP = entity.getAutoConsumoHP;
    model.saldoGeracaoHP = entity.getSaldoGeracaoHP;
    model.fazenda = fazendaModel;
    model.fazenda.concessionaria = concessionariaModel;
    model.geracaoLiquida = entity.getGeracaoLiquida ?? 0;

    return model;
  }

  static criar(data: FazendaGeracaoProps): FazendaGeracaoEntity {
    return new FazendaGeracaoEntity(
      uuid(),
      data.referencia,
      FazendaFactory.criarComId(data.fazenda),
      data.dataLeitura,
      data.demandaKwH,
      data.tarifaDemanda,
      data.energiaInjetadaHFP,
      data.autoConsumoHFP,
      data.saldoGeracaoHFP,
      data.energiaInjetadaHP,
      data.autoConsumoHP,
      data.saldoGeracaoHP
    );
  }

  static criarComId(data: FazendaGeracaoPropsId): FazendaGeracaoEntity {
    return new FazendaGeracaoEntity(
      data.id,
      data.referencia,
      FazendaFactory.criarComId(data.fazenda),
      data.dataLeitura,
      data.demandaKwH,
      data.tarifaDemanda,
      data.energiaInjetadaHFP,
      data.autoConsumoHFP,
      data.saldoGeracaoHFP,
      data.energiaInjetadaHP,
      data.autoConsumoHP,
      data.saldoGeracaoHP
    );
  }
}
