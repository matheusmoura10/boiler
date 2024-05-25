import { BaseEntity } from "../../../@shared/entities/base.entity";
import ContaEntity from "../../contas/conta.entity";
import CotasEntity from "../../cotas/cotas.entity";
import FazendaGeracaoEntity from "../../fazenda-geracao/fazenda.geracao.entity";
import BalancoDadosExternosEntity from "./balanco.dados.externos.entity";

export interface BalancoProps {
  id?: string;
  referencia: Date;
  dadosExternos?: BalancoDadosExternosEntity;
  fazenda: FazendaGeracaoEntity;
  cota: CotasEntity;
  contaEnergia?: ContaEntity;
  balancoAnterior?: BalancoEnergiaEntity;
  possuiConta?: boolean;
  saldoAtualkWh?: number;
  saldoAnteriorkWh?: number;
  prekWhCpuAnterior?: number;
  poskWhCpuAnterior?: number;
  prekWhCpuAtual?: number;
  poskWhCpuAtual?: number;
  energiaNaoIsentakWh?: number;
  energiaCompensadaRoofTopkWh?: number;
  energiaCompensadaTotalkWh?: number;
  energiaInjetadaRoofTopkWh?: number;
  energiaInjetadakWh?: number;
  saldoRoofTopkWh?: number;
  cotaCalculada?: number;
  kWhCpu?: number;
  kWhCpuAnterior?: number;
  kWhCpuAtual?: number;
  energiaFaturavel?: number;
}

export default class BalancoEnergiaEntity extends BaseEntity {
  private referencia: Date;
  private dadosExternos?: BalancoDadosExternosEntity;
  private fazendaGeracao: FazendaGeracaoEntity;
  private cota: CotasEntity;
  private contaEnergia?: ContaEntity | null;
  private balancoAnterior: BalancoEnergiaEntity | null;
  private possuiConta: boolean;
  private saldoAtualkWh: number | null;
  private saldoAnteriorkWh: number | null;
  private prekWhCpuAnterior: number;
  private poskWhCpuAnterior: number | null;
  private prekWhCpuAtual: number | null;
  private poskWhCpuAtual: number | null;
  private energiaNaoIsentakWh: number | null;
  private energiaCompensadaRoofTopkWh: number | null;
  private energiaCompensadaTotalkWh: number | null;
  private energiaInjetadaRoofTopkWh: number | null;
  private energiaInjetadakWh: number | null;
  private saldoRoofTopkWh: number | null;
  private cotaCalculada: number | null;
  private kWhCpu: number | null;
  private kWhCpuAnterior: number | null;
  private kWhCpuAtual: number | null;
  private energiaFaturavel: number | null;

  constructor(props: Partial<BalancoProps>) {
    super(props.id);
    this.referencia = props.referencia;
    this.dadosExternos = props.dadosExternos;
    this.fazendaGeracao = props.fazenda;
    this.cota = props.cota;
    this.contaEnergia = props.contaEnergia;
    this.balancoAnterior = props.balancoAnterior;
    this.possuiConta = props.possuiConta;
    this.saldoAtualkWh = props.saldoAtualkWh;
    this.saldoAnteriorkWh = props.saldoAnteriorkWh;
    this.prekWhCpuAnterior = props.prekWhCpuAnterior;
    this.poskWhCpuAnterior = props.poskWhCpuAnterior;
    this.prekWhCpuAtual = props.prekWhCpuAtual;
    this.poskWhCpuAtual = props.poskWhCpuAtual;
    this.energiaNaoIsentakWh = props.energiaNaoIsentakWh;
    this.energiaCompensadaRoofTopkWh = props.energiaCompensadaRoofTopkWh;
    this.energiaCompensadaTotalkWh = props.energiaCompensadaTotalkWh;
    this.energiaInjetadaRoofTopkWh = props.energiaInjetadaRoofTopkWh;
    this.energiaInjetadakWh = props.energiaInjetadakWh;
    this.saldoRoofTopkWh = props.saldoRoofTopkWh;
    this.cotaCalculada = props.cotaCalculada;
    this.kWhCpu = props.kWhCpu;
    this.kWhCpuAnterior = props.kWhCpuAnterior;
    this.kWhCpuAtual = props.kWhCpuAtual;
    this.energiaFaturavel = props.energiaFaturavel;
  }

  possuiContaEnergia(): boolean {
    return this.contaEnergia !== null;
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

  getDadosExternos(): BalancoDadosExternosEntity {
    return this.dadosExternos;
  }

  setDadosExternos(dadosExternos: BalancoDadosExternosEntity): void {
    this.dadosExternos = dadosExternos;
  }

  getFazenda(): FazendaGeracaoEntity {
    return this.fazendaGeracao;
  }

  setFazenda(fazenda: FazendaGeracaoEntity): void {
    this.fazendaGeracao = fazenda;
  }

  getCota(): CotasEntity {
    return this.cota;
  }

  setCota(cota: CotasEntity): void {
    this.cota = cota;
  }

  getContaEnergia(): ContaEntity {
    return this.contaEnergia;
  }

  setContaEnergia(contaEnergia: ContaEntity): void {
    this.contaEnergia = contaEnergia;
  }

  getBalancoAnterior(): BalancoEnergiaEntity | null {
    return this.balancoAnterior;
  }

  setBalancoAnterior(balancoAnterior: BalancoEnergiaEntity): void {
    this.balancoAnterior = balancoAnterior;
  }

  getPossuiConta(): boolean {
    return this.possuiConta;
  }

  setPossuiConta(possuiConta: boolean): void {
    this.possuiConta = possuiConta;
  }

  getSaldoAtualkWh(): number {
    return this.saldoAtualkWh;
  }

  setSaldoAtualkWh(saldoAtualkWh: number): void {
    this.saldoAtualkWh = saldoAtualkWh;
  }

  getSaldoAnteriorkWh(): number {
    return this.saldoAnteriorkWh;
  }

  setSaldoAnteriorkWh(saldoAnteriorkWh: number): void {
    this.saldoAnteriorkWh = saldoAnteriorkWh;
  }

  getPrekWhCpuAnterior(): number {
    return this.prekWhCpuAnterior;
  }

  setPrekWhCpuAnterior(prekWhCpuAnterior: number): void {
    this.prekWhCpuAnterior = prekWhCpuAnterior;
  }

  getPoskWhCpuAnterior(): number {
    return this.poskWhCpuAnterior;
  }

  setPoskWhCpuAnterior(poskWhCpuAnterior: number): void {
    this.poskWhCpuAnterior = poskWhCpuAnterior;
  }

  getPrekWhCpuAtual(): number {
    return this.prekWhCpuAtual;
  }

  setPrekWhCpuAtual(prekWhCpuAtual: number): void {
    this.prekWhCpuAtual = prekWhCpuAtual;
  }

  getPoskWhCpuAtual(): number {
    return this.poskWhCpuAtual;
  }

  setPoskWhCpuAtual(poskWhCpuAtual: number): void {
    this.poskWhCpuAtual = poskWhCpuAtual;
  }

  getEnergiaNaoIsentakWh(): number {
    return this.energiaNaoIsentakWh;
  }

  setEnergiaNaoIsentakWh(energiaNaoIsentakWh: number): void {
    this.energiaNaoIsentakWh = energiaNaoIsentakWh;
  }

  getEnergiaCompensadaRoofTopkWh(): number {
    return this.energiaCompensadaRoofTopkWh;
  }

  setEnergiaCompensadaRoofTopkWh(energiaCompensadaRoofTopkWh: number): void {
    this.energiaCompensadaRoofTopkWh = energiaCompensadaRoofTopkWh;
  }

  getEnergiaCompensadaTotalkWh(): number {
    return this.energiaCompensadaTotalkWh;
  }

  setEnergiaCompensadaTotalkWh(energiaCompensadaTotalkWh: number): void {
    this.energiaCompensadaTotalkWh = energiaCompensadaTotalkWh;
  }

  getEnergiaInjetadaRoofTopkWh(): number {
    return this.energiaInjetadaRoofTopkWh;
  }

  setEnergiaInjetadaRoofTopkWh(energiaInjetadaRoofTopkWh: number): void {
    this.energiaInjetadaRoofTopkWh = energiaInjetadaRoofTopkWh;
  }

  getEnergiaInjetadakWh(): number {
    return this.energiaInjetadakWh;
  }

  setEnergiaInjetadakWh(energiaInjetadakWh: number): void {
    this.energiaInjetadakWh = energiaInjetadakWh;
  }

  getSaldoRoofTopkWh(): number {
    return this.saldoRoofTopkWh;
  }

  setSaldoRoofTopkWh(saldoRoofTopkWh: number): void {
    this.saldoRoofTopkWh = saldoRoofTopkWh;
  }

  getCotaCalculada(): number {
    return this.cotaCalculada;
  }

  setCotaCalculada(cotaCalculada: number): void {
    this.cotaCalculada = cotaCalculada;
  }

  getKWhCpu(): number {
    return this.kWhCpu;
  }

  setKWhCpu(kWhCpu: number): void {
    this.kWhCpu = kWhCpu;
  }

  getKWhCpuAnterior(): number {
    return this.kWhCpuAnterior;
  }

  setKWhCpuAnterior(kWhCpuAnterior: number): void {
    this.kWhCpuAnterior = kWhCpuAnterior;
  }

  getKWhCpuAtual(): number {
    return this.kWhCpuAtual;
  }

  setKWhCpuAtual(kWhCpuAtual: number): void {
    this.kWhCpuAtual = kWhCpuAtual;
  }

  getEnergiaFaturavel(): number {
    return this.energiaFaturavel;
  }

  setEnergiaFaturavel(energiaFaturavel: number): void {
    this.energiaFaturavel = energiaFaturavel;
  }
}
