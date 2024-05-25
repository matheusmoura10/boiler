import BalancoEnergiaModel from "./balanco.energia.model";
import { FazendaGeracaoModel } from "./fazenda.geracao.model";
import CotasModel from "./cotas.model";
import ContasModel from "./contas.model";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import BalancoAnaliseModel from "./balanco.analise.model";
import { injectable } from "inversify";

@injectable()
@Entity("balanco")
export default class BalancoModel {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column("date", { name: "referencia", nullable: false })
  declare referencia: Date;

  @Column("int", { name: "contrato", nullable: false })
  declare contrato: number;

  @Column("varchar", { name: "numero_instalacao", nullable: false })
  declare numeroInstalacao: string;

  @Column("int", { name: "dados_externos", nullable: true })
  declare dadosExternos: null;

  @OneToOne(() => BalancoEnergiaModel, (energia) => energia.id, {
    nullable: false,
  })
  @JoinColumn({ name: "energia_id", referencedColumnName: "id" })
  declare energia: BalancoEnergiaModel;

  @OneToOne(() => BalancoAnaliseModel, (analise) => analise.id, {
    nullable: false,
  })
  @JoinColumn({ name: "analise_id", referencedColumnName: "id" })
  declare analise: BalancoAnaliseModel;

  @OneToOne(() => FazendaGeracaoModel, (fazenda) => fazenda.id, {
    nullable: false,
  })
  @JoinColumn({ name: "fazenda_geracao_id", referencedColumnName: "id" })
  declare fazendaGeracao: FazendaGeracaoModel;

  @OneToOne(() => CotasModel, (cota) => cota.id, {
    nullable: false,
  })
  @JoinColumn({ name: "cota_id", referencedColumnName: "id" })
  declare cota: CotasModel;

  @OneToOne(() => ContasModel, (conta) => conta.id, {
    nullable: true,
  })
  @JoinColumn({ name: "conta_id", referencedColumnName: "id" })
  declare contaEnergia: ContasModel | null;

  @OneToOne(() => BalancoModel, (balanco) => balanco.id, {
    nullable: true,
  })
  @JoinColumn({ name: "balanco_anterior_id", referencedColumnName: "id" })
  declare balancoAnterior: BalancoModel | null;

  @Column("varchar", { name: "resultado_balanco", nullable: false })
  declare resultadoBalanco: any;

  @Column("boolean", { name: "possui_conta", nullable: false })
  declare possuiConta: boolean;
}
