import { injectable } from "inversify";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FazendaGeracaoModel } from "./fazenda.geracao.model";
import ContasModel from "./contas.model";
import CotasModel from "./cotas.model";

@Entity({
  name: "balanco_energia",
})
@injectable()
export default class BalancoEnergiaModel {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column("date", { name: "referencia", nullable: false })
  declare referencia: Date;

  @ManyToOne(() => FazendaGeracaoModel, (fazendaGeracao) => fazendaGeracao.id)
  @JoinColumn({ name: "fazenda_geracao_id", referencedColumnName: "id" })
  declare fazendaGeracao: FazendaGeracaoModel;

  @OneToOne(() => ContasModel, (contaEnergia) => contaEnergia.id, {
    nullable: true,
  })
  @JoinColumn({ name: "conta_energia_id", referencedColumnName: "id" })
  declare contaEnergia: ContasModel;

  @OneToOne(() => CotasModel, (cota) => cota.id, {
    nullable: false,
  })
  @JoinColumn({ name: "cota_id", referencedColumnName: "id" })
  declare cota: CotasModel;

  @Column("boolean", { name: "possui_conta", nullable: false })
  declare possuiConta: boolean;

  @Column("float", { name: "saldo_atual_kwh", nullable: false })
  declare saldoAtualkWh: number;

  @Column("float", { name: "saldo_anterior_kwh", nullable: false })
  declare saldoAnteriorkWh: number;

  @Column("float", { name: "pre_kwh_cpu_anterior", nullable: false })
  declare prekWhCpuAnterior: number;

  @Column("float", { name: "pos_kwh_cpu_anterior", nullable: false })
  declare poskWhCpuAnterior: number;

  @Column("float", { name: "pre_kwh_cpu_atual", nullable: false })
  declare prekWhCpuAtual: number;

  @Column("float", { name: "pos_kwh_cpu_atual", nullable: false })
  declare poskWhCpuAtual: number;

  @Column("float", { name: "energia_nao_isenta_kwh", nullable: false })
  declare energiaNaoIsentakWh: number;

  @Column("float", { name: "energia_isenta_kwh", nullable: false })
  declare energiaCompensadaRoofTopkWh: number;

  @Column("float", { name: "energia_compensada_total_kwh", nullable: false })
  declare energiaCompensadaTotalkWh: number;

  @Column("float", { name: "energia_injetada_roof_top_kwh", nullable: false })
  declare energiaInjetadaRoofTopkWh: number;

  @Column("float", { name: "energia_injetada_kwh", nullable: false })
  declare energiaInjetadakWh: number;

  @Column("float", { name: "saldo_roof_top_kwh", nullable: false })
  declare saldoRoofTopkWh: number;

  @Column("float", { name: "saldo_total_kwh", nullable: false })
  declare cotaCalculada: number;

  @Column("float", { name: "kwh_cpu", nullable: false })
  declare kWhCpu: number;

  @Column("float", { name: "kwh_cpu_anterior", nullable: false })
  declare kWhCpuAnterior: number;

  @Column("float", { name: "kwh_cpu_atual", nullable: false })
  declare kWhCpuAtual: number;

  @Column("float", { name: "energia_faturavel", nullable: false })
  declare energiaFaturavel: number;
  model: import("/home/matheus/boiler/src/domain/fazenda-geracao/fazenda.geracao.entity").default;
}
