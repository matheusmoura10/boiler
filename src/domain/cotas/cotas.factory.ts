import * as moment from "moment";
import CotasEntity from "./cotas.entity";
import { v4 as uuid } from "uuid";
import CotasModel from "../../infra/data/models/cotas.model";

export interface CotasProps {
  referencia: Date;
  numeroInstalacao: string;
  cotaAtual: number;
  alteracao: string;
  contrato: number;
  cotaFinal: number;
  numeroInstalacaoFazenda: string;
}

export interface CotasPropsWithId extends CotasProps {
  id: string;
}

export default class CotasFactory {
  static create(data: CotasProps): CotasEntity {
    return new CotasEntity({
      id: uuid(),
      referencia: data.referencia,
      numeroInstalacao: data.numeroInstalacao,
      cotaAtual: data.cotaAtual,
      alteracao: data.alteracao,
      contrato: data.contrato,
      cotaFinal: data.cotaFinal,
      numeroInstalacaoFazenda: data.numeroInstalacaoFazenda,
    });
  }

  static createMany(data: CotasProps[]): CotasEntity[] {
    return data.map(
      (item) =>
        new CotasEntity({
          id: uuid(),
          referencia: item.referencia,
          numeroInstalacao: item.numeroInstalacao,
          cotaAtual: item.cotaAtual,
          alteracao: item.alteracao,
          contrato: item.contrato,
          cotaFinal: item.cotaFinal,
          numeroInstalacaoFazenda: item.numeroInstalacaoFazenda,
        })
    );
  }

  static createManyFromCSV(data: any[]): CotasEntity[] {
    return data.map((item) => this.createFromCSV(item));
  }

  static createFromCSV(data: any): CotasEntity {
    return this.create({
      referencia: moment(data.referencia, "DD/MM/YYYY").toDate(),
      numeroInstalacao: data.numeroInstalacao,
      cotaAtual: parseFloat(data.cotaAtual.replace(",", ".")) / 100,
      alteracao: data.alteracao,
      contrato: parseInt(data.contrato),
      cotaFinal: parseFloat(data.cotaFinal.replace(",", ".")) / 100,
      numeroInstalacaoFazenda: data.numeroInstalacaoFazenda,
    });
  }

  static toModelFromObject(data: any): CotasModel {
    const model = new CotasModel();
    model.id = data.id;
    model.referencia = moment(data.referencia).toDate();
    model.numeroInstalacao = data.numeroInstalacao;
    model.cotaAtual = data.cotaAtual;
    model.alteracao = data.alteracao;
    model.contrato = data.contrato;
    model.cotaFinal = data.cotaFinal;
    model.numeroInstalacaoFazenda = data.numeroInstalacaoFazenda;

    return model;
  }

  static toModel(data: CotasEntity): CotasModel {
    const model = new CotasModel();
    model.id = data.getId;
    model.referencia = moment(data.getReferencia()).toDate();
    model.numeroInstalacao = data.getNumeroInstalacao();
    model.cotaAtual = data.getCotaAtual();
    model.alteracao = data.getAlteracao();
    model.contrato = data.getContrato();
    model.cotaFinal = data.getCotaFinal();
    model.numeroInstalacaoFazenda = data.getNumeroInstalacaoFazenda();

    return model;
  }

  static toEntity(data: CotasModel): CotasEntity {
    return new CotasEntity({
      id: data.id,
      referencia: data.referencia,
      numeroInstalacao: data.numeroInstalacao,
      cotaAtual: data.cotaAtual,
      alteracao: data.alteracao,
      contrato: data.contrato,
      cotaFinal: data.cotaFinal,
      numeroInstalacaoFazenda: data.numeroInstalacaoFazenda,
    });
  }
}
