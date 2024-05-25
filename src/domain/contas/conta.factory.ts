import ContasModel from "../../infra/data/models/contas.model";
import ContaEntity, { ContasPropsWithId } from "./conta.entity";
import { v4 as uuid } from "uuid";

export default class ContaFactory {
  static create(props: ContasPropsWithId): ContaEntity {
    return new ContaEntity({
      id: uuid(),
      numeroCliente: props.numeroCliente,
      numeroInstalacao: props.numeroInstalacao,
      saldoPreAnteriorkWh: props.saldoPreAnteriorkWh,
      saldoPosAnteriorkWh: props.saldoPosAnteriorkWh,
      energiaRoofTopkWh: props.energiaRoofTopkWh,
      compensadoRoofTopkWh: props.compensadoRoofTopkWh,
      saldoAtualkWh: props.saldoAtualkWh,
      tarifaComImpostos: props.tarifaComImpostos,
      tarifaCompensacao: props.tarifaCompensacao,
      tarifaSemImpostos: props.tarifaSemImpostos,
      disponibilidade: props.disponibilidade,
      consumoMeskWh: props.consumoMeskWh,
      compensadoTotal: props.compensadoTotal,
    });
  }

  static toModel(entity: ContaEntity): ContasModel {
    return {
      id: entity.getId,
      referencia: entity.getReferencia(),
      numeroCliente: entity.getNumeroCliente(),
      numeroInstalacao: entity.getNumeroInstalacao(),
      compensadoRoofTopkWh: entity.getCompensadoRoofTopkWh(),
      compensadoTotal: entity.getCompensadoTotal(),
      consumoMeskWh: entity.getConsumoMeskWh(),
      disponibilidade: entity.getDisponibilidade(),
      energiaRoofTopkWh: entity.getEnergiaRoofTopkWh(),
      saldoAtualkWh: entity.getSaldoAtualkWh(),
      saldoPosAnteriorkWh: entity.getSaldoPosAnteriorkWh(),
      saldoPreAnteriorkWh: entity.getSaldoPreAnteriorkWh(),
      tarifaComImpostos: entity.getTarifaComImpostos(),
      tarifaCompensacao: entity.getTarifaCompensacao(),
      tarifaSemImpostos: entity.getTarifaSemImpostos(),
    };
  }

  static fromModel(model: ContasPropsWithId): ContaEntity {
    return new ContaEntity({
      id: model.id,
      referencia: model.referencia,
      numeroCliente: model.numeroCliente,
      numeroInstalacao: model.numeroInstalacao,
      saldoPreAnteriorkWh: model.saldoPreAnteriorkWh,
      saldoPosAnteriorkWh: model.saldoPosAnteriorkWh,
      energiaRoofTopkWh: model.energiaRoofTopkWh,
      compensadoRoofTopkWh: model.compensadoRoofTopkWh,
      saldoAtualkWh: model.saldoAtualkWh,
      tarifaComImpostos: model.tarifaComImpostos,
      tarifaCompensacao: model.tarifaCompensacao,
      tarifaSemImpostos: model.tarifaSemImpostos,
      disponibilidade: model.disponibilidade,
      consumoMeskWh: model.consumoMeskWh,
      compensadoTotal: model.compensadoTotal,
    });
  }

  static fromModels(models: ContasPropsWithId[]): ContaEntity[] {
    return models.map((model) => this.fromModel(model));
  }

  static toEntity(contaEnergia: ContasModel): ContaEntity {
    return new ContaEntity({
      id: contaEnergia.id,
      referencia: contaEnergia.referencia,
      numeroCliente: contaEnergia.numeroCliente,
      numeroInstalacao: contaEnergia.numeroInstalacao,
      saldoPreAnteriorkWh: contaEnergia.saldoPreAnteriorkWh,
      saldoPosAnteriorkWh: contaEnergia.saldoPosAnteriorkWh,
      energiaRoofTopkWh: contaEnergia.energiaRoofTopkWh,
      compensadoRoofTopkWh: contaEnergia.compensadoRoofTopkWh,
      saldoAtualkWh: contaEnergia.saldoAtualkWh,
      tarifaComImpostos: contaEnergia.tarifaComImpostos,
      tarifaCompensacao: contaEnergia.tarifaCompensacao,
      tarifaSemImpostos: contaEnergia.tarifaSemImpostos,
      disponibilidade: contaEnergia.disponibilidade,
      consumoMeskWh: contaEnergia.consumoMeskWh,
      compensadoTotal: contaEnergia.compensadoTotal,
    });
  }
}
