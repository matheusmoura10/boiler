import { BaseEntity } from "../../@shared/entities/base.entity";

export default class CotasEntity extends BaseEntity {
  validar(): void {
    throw new Error("Method not implemented.");
  }
  private referencia: Date;
  private numeroInstalacao: string;
  private cotaAtual: number;
  private alteracao: string;
  private contrato: number;
  private cotaFinal: number;
  private numeroInstalacaoFazenda: string;

  constructor({
    id,
    referencia,
    numeroInstalacao,
    cotaAtual,
    alteracao,
    contrato,
    cotaFinal,
    numeroInstalacaoFazenda,
  }: {
    id: string;
    referencia: Date;
    numeroInstalacao: string;
    cotaAtual: number;
    alteracao: string;
    contrato: number;
    cotaFinal: number;
    numeroInstalacaoFazenda: string;
  }) {
    super(id);
    this.referencia = referencia;
    this.numeroInstalacao = numeroInstalacao;
    this.cotaAtual = cotaAtual;
    this.alteracao = alteracao;
    this.contrato = contrato;
    this.cotaFinal = cotaFinal;
    this.numeroInstalacaoFazenda = numeroInstalacaoFazenda;
  }

  getReferencia(): Date {
    return this.referencia;
  }

  setReferencia(referencia: Date): void {
    this.referencia = referencia;
  }

  getNumeroInstalacao(): string {
    return this.numeroInstalacao;
  }

  setNumeroInstalacao(numeroInstalacao: string): void {
    this.numeroInstalacao = numeroInstalacao;
  }

  getCotaAtual(): number {
    return this.cotaAtual;
  }

  setCotaAtual(cotaAtual: number): void {
    this.cotaAtual = cotaAtual;
  }

  getAlteracao(): string {
    return this.alteracao;
  }

  setAlteracao(alteracao: string): void {
    this.alteracao = alteracao;
  }

  getContrato(): number {
    return this.contrato;
  }

  setContrato(contrato: number): void {
    this.contrato = contrato;
  }

  getCotaFinal(): number {
    return this.cotaFinal;
  }

  setCotaFinal(cotaFinal: number): void {
    this.cotaFinal = cotaFinal;
  }

  getNumeroInstalacaoFazenda(): string {
    return this.numeroInstalacaoFazenda;
  }

  setNumeroInstalacaoFazenda(numeroInstalacaoFazenda: string): void {
    this.numeroInstalacaoFazenda = numeroInstalacaoFazenda;
  }
}
