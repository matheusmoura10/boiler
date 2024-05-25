import { injectable } from "inversify";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "cotas",
})
@injectable()
@Index(
  ["referencia", "numeroInstalacao", "numeroInstalacaoFazenda", "contrato"],
  { unique: false }
)
export default class CotasModel {
  @PrimaryGeneratedColumn("uuid")
  declare id: string;

  @Column("date", { name: "referencia", nullable: false })
  @Index()
  declare referencia: Date;

  @Column("varchar", { name: "numero_instalacao", nullable: false })
  declare numeroInstalacao: string;

  @Column("float", { name: "cota_atual", nullable: false })
  declare cotaAtual: number;

  @Column("varchar", { name: "alteracao", nullable: false })
  declare alteracao: string;

  @Column("int", { name: "contrato", nullable: false })
  declare contrato: number;

  @Column("float", { name: "cota_final", nullable: false })
  declare cotaFinal: number;

  @Column("varchar", { name: "numero_instalacao_fazenda", nullable: false })
  declare numeroInstalacaoFazenda: string;
}
