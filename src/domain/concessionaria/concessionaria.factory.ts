import { v4 as uuid } from "uuid";
import ConcessionariaEntity from "./concessionaria.entity";
import { ConcessionariaModel } from "../../infra/data/models/concessionaria.model";

export interface ConcessionariaProps {
  nome: string;
  estado: string;
}

export interface ConcessionariaPropsWithId extends ConcessionariaProps {
  id: string;
}

export default class ConcessionariaFactory {
  static criar(data: ConcessionariaProps): ConcessionariaEntity {
    return new ConcessionariaEntity(uuid(), data.nome, data.estado);
  }

  static criarComId(data: ConcessionariaPropsWithId): ConcessionariaEntity {
    return new ConcessionariaEntity(data.id, data.nome, data.estado);
  }

  static entityToModel(entity: ConcessionariaEntity): ConcessionariaModel {
    const model = new ConcessionariaModel();
    model.id = entity.getId;
    model.nome = entity.getNome;
    model.estado = entity.getEstado;

    return model;
  }

  static modelToEntity(
    concessionaria: ConcessionariaModel
  ): ConcessionariaEntity {
    return new ConcessionariaEntity(
      concessionaria.id,
      concessionaria.nome,
      concessionaria.estado
    );
  }
}
