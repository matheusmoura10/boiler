import { BaseEntity } from "../../@shared/entities/base.entity";
export interface ContasProps {
  referencia: Date;
  numeroCliente: string;
  numeroInstalacao: string;
  saldoPreAnteriorkWh: number;
  saldoPosAnteriorkWh: number;
  energiaRoofTopkWh: number;
  compensadoRoofTopkWh: number;
  saldoAtualkWh: number;
  tarifaComImpostos: number;
  tarifaCompensacao: number;
  tarifaSemImpostos: number;
  disponibilidade: number;
  consumoMeskWh: number;
  compensadoTotal: number;
}

export interface ContasPropsWithId extends ContasProps {
  id: string;
}

export default class ContaEntity extends BaseEntity {
  private referencia: Date;
  private numeroCliente: string;
  private numeroInstalacao: string;
  private saldoPreAnteriorkWh: number;
  private saldoPosAnteriorkWh: number;
  private energiaRoofTopkWh: number;
  private compensadoRoofTopkWh: number;
  private saldoAtualkWh: number;
  private tarifaComImpostos: number;
  private tarifaCompensacao: number;
  private tarifaSemImpostos: number;
  private disponibilidade: number;
  private consumoMeskWh: number;
  private compensadoTotal: number;
  private energiaInjetadakWh: any;

  constructor(props: Partial<ContasPropsWithId>) {
    super(props.id);
    this.referencia = props.referencia;
    this.numeroCliente = props.numeroCliente;
    this.numeroInstalacao = props.numeroInstalacao;
    this.saldoPreAnteriorkWh = props.saldoPreAnteriorkWh;
    this.saldoPosAnteriorkWh = props.saldoPosAnteriorkWh;
    this.energiaRoofTopkWh = props.energiaRoofTopkWh;
    this.compensadoRoofTopkWh = props.compensadoRoofTopkWh;
    this.saldoAtualkWh = props.saldoAtualkWh;
    this.tarifaComImpostos = props.tarifaComImpostos;
    this.tarifaCompensacao = props.tarifaCompensacao;
    this.tarifaSemImpostos = props.tarifaSemImpostos;
    this.disponibilidade = props.disponibilidade;
    this.consumoMeskWh = props.consumoMeskWh;
    this.compensadoTotal = props.compensadoTotal;
  }

  validar(): void {
    throw new Error("Method not implemented.");
  }

  getReferencia(): Date {
    return this.referencia;
  }
  setReferencia(referencia: Date): void {
    this.referencia = referencia;
  }

  getNumeroCliente(): string {
    return this.numeroCliente;
  }

  setNumeroCliente(numeroCliente: string): void {
    this.numeroCliente = numeroCliente;
  }

  getNumeroInstalacao(): string {
    return this.numeroInstalacao;
  }

  setNumeroInstalacao(numeroInstalacao: string): void {
    this.numeroInstalacao = numeroInstalacao;
  }

  getSaldoPreAnteriorkWh(): number {
    return this.saldoPreAnteriorkWh ?? 0;
  }

  setSaldoPreAnteriorkWh(saldoPreAnteriorkWh: number): void {
    this.saldoPreAnteriorkWh = saldoPreAnteriorkWh;
  }

  getSaldoPosAnteriorkWh(): number {
    return this.saldoPosAnteriorkWh ?? 0;
  }

  setSaldoPosAnteriorkWh(saldoPosAnteriorkWh: number): void {
    this.saldoPosAnteriorkWh = saldoPosAnteriorkWh;
  }

  getEnergiaRoofTopkWh(): number {
    return this.energiaRoofTopkWh;
  }

  setEnergiaRoofTopkWh(energiaRoofTopkWh: number): void {
    this.energiaRoofTopkWh = energiaRoofTopkWh;
  }

  getCompensadoRoofTopkWh(): number {
    return this.compensadoRoofTopkWh;
  }

  setCompensadoRoofTopkWh(compensadoRoofTopkWh: number): void {
    this.compensadoRoofTopkWh = compensadoRoofTopkWh;
  }

  getSaldoAtualkWh(): number {
    return this.saldoAtualkWh;
  }

  setSaldoAtualkWh(saldoAtualkWh: number): void {
    this.saldoAtualkWh = saldoAtualkWh;
  }

  getTarifaComImpostos(): number {
    return this.tarifaComImpostos;
  }

  setTarifaComImpostos(tarifaComImpostos: number): void {
    this.tarifaComImpostos = tarifaComImpostos;
  }

  getTarifaCompensacao(): number {
    return this.tarifaCompensacao;
  }

  setTarifaCompensacao(tarifaCompensacao: number): void {
    this.tarifaCompensacao = tarifaCompensacao;
  }

  getTarifaSemImpostos(): number {
    return this.tarifaSemImpostos;
  }

  setTarifaSemImpostos(tarifaSemImpostos: number): void {
    this.tarifaSemImpostos = tarifaSemImpostos;
  }

  getDisponibilidade(): number {
    return this.disponibilidade;
  }

  setDisponibilidade(disponibilidade: number): void {
    this.disponibilidade = disponibilidade;
  }

  getConsumoMeskWh(): number {
    return this.consumoMeskWh;
  }

  setConsumoMeskWh(consumoMeskWh: number): void {
    this.consumoMeskWh = consumoMeskWh;
  }

  getCompensadoTotal(): number {
    return this.compensadoTotal;
  }

  setCompensadoTotal(compensadoTotal: number): void {
    this.compensadoTotal = compensadoTotal;
  }

  getEnergiaInjetadakWh(): any {
    return this.energiaInjetadakWh;
  }

  setEnergiaInjetadakWh(energiaInjetadakWh: any): void {
    this.energiaInjetadakWh = energiaInjetadakWh;
  }
}
