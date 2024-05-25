import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import BalancoEnergiaModel from "./balanco.energia.model";
import CotasModel from "./cotas.model";
import { injectable } from "inversify";

@Entity("balanco_analise")
@injectable()
export default class BalancoAnaliseModel {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @OneToOne(() => BalancoEnergiaModel, (balanco) => balanco.id, {
    nullable: false,
  })
  @JoinColumn({ name: "balanco_id", referencedColumnName: "id" })
  declare balanco: BalancoEnergiaModel;

  @OneToOne(() => CotasModel, (cota) => cota.id, {
    nullable: false,
  })
  @JoinColumn({ name: "cota_id", referencedColumnName: "id" })
  declare cota: CotasModel;

  @Column("float", { name: "desvio_cota_percentual_final", nullable: false })
  declare desvioCotaPercentualFinal: number;

  @Column("float", { name: "desvio_cota_percentual_inicial", nullable: false })
  declare desvioCotaPercentualInicial: number;

  @Column("float", { name: "desvio_cota_kwh_final", nullable: false })
  declare desvioCotaKwhFinal: number;

  @Column("float", { name: "desvio_cota_kwh_inicial", nullable: false })
  declare desvioCotaKwhInicial: number;

  @Column("float", { name: "kwh_total_final", nullable: false })
  declare kwhTotalFinal: number;

  @Column("float", { name: "kwh_total_inicial", nullable: false })
  declare kwhTotalInicial: number;

  @Column("float", { name: "desvio_absoluto_final", nullable: false })
  declare desvioRelativoFinal: number;

  @Column("float", { name: "desvio_absoluto_inicial", nullable: false })
  declare desvioRelativoInicial: number;
}
