import {
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from "typeorm";
import { LogModel } from "../models/log.model";
import DataSource from "../../config/db/data-source";

export enum TipoLog {
  TYPEORM = "TYPEORM",
  AUDITORIA = "AUDITORIA",
}

export enum AcaoLog {
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface InputLog {
  tipo: TipoLog;
  data: Date;
  auditoria_id: string;
  acao: AcaoLog;
  tabela: string;
  colunas: any;
  valores_alterados: any;
  usuario: string;
}

export abstract class SubscriberLog<Entity>
  implements EntitySubscriberInterface<Entity>
{
  manager = DataSource.manager.getRepository(LogModel);

  abstract listenTo();

  async beforeRemove(event: RemoveEvent<Entity>): Promise<Promise<any> | void> {
    return this.salvarLog({
      tipo: TipoLog.TYPEORM,
      data: new Date(),
      auditoria_id: "1",
      acao: AcaoLog.DELETE,
      tabela: event.metadata.tableName,
      colunas: Object.keys(event.entity),
      valores_alterados: event.entity,
      usuario: "system",
    });
  }

  async beforeInsert(event: InsertEvent<Entity>): Promise<Promise<any> | void> {
    return this.salvarLog({
      tipo: TipoLog.TYPEORM,
      data: new Date(),
      auditoria_id: "1",
      acao: AcaoLog.INSERT,
      tabela: event.metadata.tableName,
      colunas: Object.keys(event.entity),
      valores_alterados: event.entity,
      usuario: "system",
    });
  }

  async beforeUpdate(event: UpdateEvent<Entity>): Promise<Promise<any> | void> {
    const oldData = event.databaseEntity;
    const newData = event.entity;
    const diferencas: any = {};
    for (const prop in newData) {
      if (oldData[prop] !== newData[prop]) {
        diferencas[prop] = {
          oldValue: oldData[prop],
          newValue: newData[prop],
        };
      }
    }

    return this.salvarLog({
      tipo: TipoLog.TYPEORM,
      data: new Date(),
      auditoria_id: "1",
      acao: AcaoLog.UPDATE,
      tabela: event.metadata.tableName,
      colunas: Object.keys(newData),
      valores_alterados: diferencas,
      usuario: "system",
    });
  }

  async salvarLog(event: InputLog) {
    await this.manager.save(event);
  }
}
