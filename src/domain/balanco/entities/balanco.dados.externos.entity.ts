import { BaseEntity } from "typeorm";

export default class BalancoDadosExternosEntity extends BaseEntity {
  private correcaoFonteEnergia?: number;
  private saldoPreAnterior?: number;
  private saldoPosAnterior?: number;

  constructor(
    correcaoFonteEnergia: number,
    saldoPreAnterior: number,
    saldoPosAnterior: number
  ) {
    super();
    this.correcaoFonteEnergia = correcaoFonteEnergia;
    this.saldoPreAnterior = saldoPreAnterior;
    this.saldoPosAnterior = saldoPosAnterior;
  }

  validar(): void {
    throw new Error("Method not implemented.");
  }

  getCorrecaoFonteEnergia(): number {
    return this.correcaoFonteEnergia || 0;
  }

  setCorrecaoFonteEnergia(correcaoFonteEnergia: number): void {
    this.correcaoFonteEnergia = correcaoFonteEnergia;
  }

  getSaldoPreAnterior(): number {
    return this.saldoPreAnterior || 0;
  }

  setSaldoPreAnterior(saldoPreAnterior: number): void {
    this.saldoPreAnterior = saldoPreAnterior;
  }

  getSaldoPosAnterior(): number {
    return this.saldoPosAnterior || 0;
  }

  setSaldoPosAnterior(saldoPosAnterior: number): void {
    this.saldoPosAnterior = saldoPosAnterior;
  }
}
