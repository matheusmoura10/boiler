import * as moment from "moment";
import BalancoEnergiaModel from "../../../infra/data/models/balanco.energia.model";
import ContaFactory from "../../contas/conta.factory";
import FazendaGeracaoFactory from "../../fazenda-geracao/fazenda.geracao.factory";
import BalancoEnergiaEntity, {
  BalancoProps,
} from "../entities/balanco.energia.entity";
import { v4 as uuid } from "uuid";
import CotasFactory from "../../cotas/cotas.factory";
import FazendaFactory from "../../fazenda/fazenda.factory";

export default class BalancoEnergiaFactory {
  static toModel(resultado: BalancoEnergiaEntity): BalancoEnergiaModel {
    const model = new BalancoEnergiaModel();
    model.id = resultado.getId;
    model.possuiConta = resultado.getPossuiConta();
    model.referencia = moment(resultado.getReferencia()).toDate();
    model.fazendaGeracao = FazendaGeracaoFactory.entityToModel(
      resultado.getFazenda()
    );
    model.cota = CotasFactory.toModel(resultado.getCota());
    model.contaEnergia = resultado.getContaEnergia()
      ? ContaFactory.toModel(resultado.getContaEnergia())
      : null;
    model.saldoAtualkWh = resultado.getSaldoAtualkWh();
    model.saldoAnteriorkWh = resultado.getSaldoAnteriorkWh();
    model.prekWhCpuAnterior = resultado.getPrekWhCpuAnterior();
    model.poskWhCpuAnterior = resultado.getPoskWhCpuAnterior();
    model.prekWhCpuAtual = resultado.getPrekWhCpuAtual();
    model.poskWhCpuAtual = resultado.getPoskWhCpuAtual();
    model.energiaNaoIsentakWh = resultado.getEnergiaNaoIsentakWh();
    model.energiaCompensadaRoofTopkWh =
      resultado.getEnergiaCompensadaRoofTopkWh();
    model.energiaCompensadaTotalkWh = resultado.getEnergiaCompensadaTotalkWh();
    model.energiaInjetadaRoofTopkWh = resultado.getEnergiaInjetadaRoofTopkWh();
    model.energiaInjetadakWh = resultado.getEnergiaInjetadakWh();
    model.saldoRoofTopkWh = resultado.getSaldoRoofTopkWh();
    model.cotaCalculada = resultado.getCotaCalculada();
    model.kWhCpu = resultado.getKWhCpu();
    model.kWhCpuAnterior = resultado.getKWhCpuAnterior();
    model.kWhCpuAtual = resultado.getKWhCpuAtual();
    model.energiaFaturavel = resultado.getEnergiaFaturavel();

    return model;
  }
  static criar(props: BalancoProps): BalancoEnergiaEntity {
    return new BalancoEnergiaEntity({
      id: uuid(),
      ...props,
    });
  }

  static toEntity(
    resultModel: BalancoEnergiaModel
  ): BalancoEnergiaEntity | PromiseLike<BalancoEnergiaEntity> {
    return new BalancoEnergiaEntity({
      id: resultModel.id,
      referencia: resultModel.referencia,
      cota: CotasFactory.toEntity(resultModel.cota),
      fazenda: FazendaGeracaoFactory.modelToEntity(resultModel.fazendaGeracao),
      contaEnergia: resultModel.contaEnergia
        ? ContaFactory.toEntity(resultModel.contaEnergia)
        : null,
      saldoAtualkWh: resultModel.saldoAtualkWh,
      saldoAnteriorkWh: resultModel.saldoAnteriorkWh,
      prekWhCpuAnterior: resultModel.prekWhCpuAnterior,
      poskWhCpuAnterior: resultModel.poskWhCpuAnterior,
      prekWhCpuAtual: resultModel.prekWhCpuAtual,
      poskWhCpuAtual: resultModel.poskWhCpuAtual,
      energiaNaoIsentakWh: resultModel.energiaNaoIsentakWh,
      energiaCompensadaRoofTopkWh: resultModel.energiaCompensadaRoofTopkWh,
      energiaCompensadaTotalkWh: resultModel.energiaCompensadaTotalkWh,
      energiaInjetadaRoofTopkWh: resultModel.energiaInjetadaRoofTopkWh,
      energiaInjetadakWh: resultModel.energiaInjetadakWh,
      saldoRoofTopkWh: resultModel.saldoRoofTopkWh,
      cotaCalculada: resultModel.cotaCalculada,
      kWhCpu: resultModel.kWhCpu,
      kWhCpuAnterior: resultModel.kWhCpuAnterior,
      kWhCpuAtual: resultModel.kWhCpuAtual,
      energiaFaturavel: resultModel.energiaFaturavel,
    });
  }
}
