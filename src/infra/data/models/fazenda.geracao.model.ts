/* referencia: Date;
    fazenda: FazendaPropsId;
    dataLeitura: Date;
    demandaKWH: number;
    tarifaDemanda: number;
    energiaInjetadaHFP: number;
    autoConsumoHFP: number;
    saldoGeracaoHFP: number;
    energiaInjetadaHP: number;
    autoConsumoHP: number;
    saldoGeracaoHP: number;
    id: string;
 */

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { injectable } from "inversify";
import { FazendaModel } from "./fazenda.model";

@Entity({
  name: "fazenda_geracao",
})
@injectable()
@Unique(["referencia", "fazenda"])
export class FazendaGeracaoModel {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column("date", { name: "referencia", nullable: false })
  declare referencia: Date;

  @Column("float", { name: "geracao_liquida", nullable: true })
  declare geracaoLiquida: number;

  @Column("date", { name: "data_leitura", nullable: false })
  declare dataLeitura: Date;

  @Column("float", { name: "demanda_kwh", nullable: false })
  declare demandaKwH: number;

  @Column("float", { name: "tarifa_demanda", nullable: false })
  declare tarifaDemanda: number;

  @Column("float", { name: "energia_injetada_hfp", nullable: false })
  declare energiaInjetadaHFP: number;

  @Column("float", { name: "auto_consumo_hfp", nullable: false })
  declare autoConsumoHFP: number;

  @Column("float", { name: "saldo_geracao_hfp", nullable: false })
  declare saldoGeracaoHFP: number;

  @Column("float", { name: "energia_injetada_hp", nullable: false })
  declare energiaInjetadaHP: number;

  @Column("float", { name: "auto_consumo_hp", nullable: false })
  declare autoConsumoHP: number;

  @Column("float", { name: "saldo_geracao_hp", nullable: false })
  declare saldoGeracaoHP: number;

  @CreateDateColumn({
    name: "created_at",
  })
  declare createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  declare updatedAt: Date;

  @ManyToOne(() => FazendaModel, (fazenda) => FazendaGeracaoModel)
  @JoinColumn({
    name: "fazenda_id",
    referencedColumnName: "id",
  })
  declare fazenda: FazendaModel;
}
