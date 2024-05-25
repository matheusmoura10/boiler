import { injectable } from "inversify";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "contas_energia",
})
@Index(["referencia", "numeroInstalacao", "numeroCliente"], { unique: true })
@injectable()
export default class ContasModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date", { name: "referencia", nullable: false })
  referencia: Date;

  @Column("varchar", { name: "numero_instalacao", nullable: false })
  numeroInstalacao: string;

  @Column("varchar", { name: "numero_cliente", nullable: false })
  numeroCliente: string;

  @Column("float", { name: "saldo_pre_anterior_kwh", nullable: true })
  saldoPreAnteriorkWh: number;

  @Column("float", { name: "saldo_pos_anterior_kwh", nullable: true })
  saldoPosAnteriorkWh: number;

  @Column("float", { name: "energia_rooftop_kwh", nullable: true })
  energiaRoofTopkWh: number;

  @Column("float", { name: "compensado_rooftop_kwh", nullable: true })
  compensadoRoofTopkWh: number;

  @Column("float", { name: "saldo_atual_kwh", nullable: false })
  saldoAtualkWh: number;

  @Column("float", { name: "tarifa_com_impostos", nullable: false })
  tarifaComImpostos: number;

  @Column("float", { name: "tarifa_compensacao", nullable: false })
  tarifaCompensacao: number;

  @Column("float", { name: "tarifa_sem_impostos", nullable: false })
  tarifaSemImpostos: number;

  @Column("float", { name: "disponibilidade", nullable: false })
  disponibilidade: number;

  @Column("float", { name: "consumo_mes_kwh", nullable: false })
  consumoMeskWh: number;

  @Column("float", { name: "compensado_total", nullable: false })
  compensadoTotal: number;
}
