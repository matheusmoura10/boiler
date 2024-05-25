import { BaseEntity } from "../../../@shared/entities/base.entity";
import ContaEntity from "../../contas/conta.entity";
import CotasEntity from "../../cotas/cotas.entity";
import FazendaGeracaoEntity from "../../fazenda-geracao/fazenda.geracao.entity";
import AnaliseBalancoEntity from "./balanco.analise.entity";
import BalancoDadosExternosEntity from "./balanco.dados.externos.entity";
import BalancoEnergiaEntity from "./balanco.energia.entity";

export default class BalancoEntiy extends BaseEntity {
  private referencia: Date;
  private contrato: number;
  private numeroInstalacao: string;
  private dadosExternos: BalancoDadosExternosEntity | null;
  private energia: BalancoEnergiaEntity;
  private analise: AnaliseBalancoEntity;
  private fazendaGeracao: FazendaGeracaoEntity;
  private cota: CotasEntity;
  private contaEnergia: ContaEntity | null;
  private balancoAnterior: BalancoEnergiaEntity | null;
  private resultadoBalanco: any;
  private possuiConta: boolean;

  constructor(
    id: string,
    referencia: Date,
    contrato: number,
    numeroInstalacao: string,
    dadosExternos: BalancoDadosExternosEntity | null,
    energia: BalancoEnergiaEntity,
    analise: AnaliseBalancoEntity,
    fazendaGeracao: FazendaGeracaoEntity,
    cota: CotasEntity,
    contaEnergia: ContaEntity | null,
    balancoAnterior: BalancoEnergiaEntity | null,
    resultadoBalanco: any,
    possuiConta: boolean
  ) {
    super(id);
    this.referencia = referencia;
    this.contrato = contrato;
    this.numeroInstalacao = numeroInstalacao;
    this.dadosExternos = dadosExternos;
    this.energia = energia;
    this.analise = analise;
    this.fazendaGeracao = fazendaGeracao;
    this.cota = cota;
    this.contaEnergia = contaEnergia;
    this.balancoAnterior = balancoAnterior;
    this.resultadoBalanco = resultadoBalanco;
    this.possuiConta = possuiConta;
  }

  validar(): void {
    throw new Error("Method not implemented.");
  }

  setReferencia(referencia: Date): void {
    this.referencia = referencia;
  }

  getReferencia(): Date {
    return this.referencia;
  }

  setContrato(contrato: number): void {
    this.contrato = contrato;
  }

  getContrato(): number {
    return this.contrato;
  }

  setNumeroInstalacao(numeroInstalacao: string): void {
    this.numeroInstalacao = numeroInstalacao;
  }

  getNumeroInstalacao(): string {
    return this.numeroInstalacao;
  }

  setDadosExternos(dadosExternos: BalancoDadosExternosEntity): void {
    this.dadosExternos = dadosExternos;
  }

  getDadosExternos(): BalancoDadosExternosEntity | null {
    return this.dadosExternos;
  }

  setEnergia(energia: BalancoEnergiaEntity): void {
    this.energia = energia;
  }

  getEnergia(): BalancoEnergiaEntity {
    return this.energia;
  }

  setAnalise(analise: AnaliseBalancoEntity): void {
    this.analise = analise;
  }

  getAnalise(): AnaliseBalancoEntity {
    return this.analise;
  }

  setFazendaGeracao(fazendaGeracao: FazendaGeracaoEntity): void {
    this.fazendaGeracao = fazendaGeracao;
  }

  getFazendaGeracao(): FazendaGeracaoEntity {
    return this.fazendaGeracao;
  }

  setCota(cota: CotasEntity): void {
    this.cota = cota;
  }

  getCota(): CotasEntity {
    return this.cota;
  }

  setContaEnergia(contaEnergia: ContaEntity): void {
    this.contaEnergia = contaEnergia;
  }

  getContaEnergia(): ContaEntity {
    return this.contaEnergia;
  }

  setBalancoAnterior(balancoAnterior: BalancoEnergiaEntity): void {
    this.balancoAnterior = balancoAnterior;
  }

  getBalancoAnterior(): BalancoEnergiaEntity {
    return this.balancoAnterior;
  }

  setResultadoBalanco(resultadoBalanco: any): void {
    this.resultadoBalanco = resultadoBalanco;
  }

  getResultadoBalanco(): any {
    return this.resultadoBalanco;
  }

  setPossuiConta(possuiConta: boolean): void {
    this.possuiConta = possuiConta;
  }

  getPossuiConta(): boolean {
    return this.possuiConta;
  }
}
