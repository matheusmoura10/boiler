import ContaEntity from "../../contas/conta.entity";
import CotasEntity from "../../cotas/cotas.entity";
import FazendaGeracaoEntity from "../../fazenda-geracao/fazenda.geracao.entity";
import BalancoEnergiaEntity from "../entities/balanco.energia.entity";
import Calculos from "./metodos/calculos";

export interface ICalculoBalanco {
  calcular(): BalancoEnergiaEntity;
}

export default abstract class AbstractCalculoBalanco
  implements ICalculoBalanco
{
  private readonly balanco: BalancoEnergiaEntity;
  private fazendaGeracao: FazendaGeracaoEntity;
  private contaEnergia: ContaEntity;
  private cota: CotasEntity;

  constructor(balanco: BalancoEnergiaEntity) {
    this.balanco = balanco;
    this.fazendaGeracao = balanco.getFazenda();
    this.contaEnergia = balanco.getContaEnergia();
    this.cota = balanco.getCota();
  }

  calcular(): BalancoEnergiaEntity {
    const obterSaldoAtual = this.calcularSaldoAtual();
    const obterSaldoAnterior = this.calcularSaldoAnterior();
    const obterEnergiaInjetada = this.calcularEnergiaInjetada();
    const obterSaldoRoofTop = this.calcularSaldoRoofTop();
    const obterCotaCalculada = this.calcularCota();
    const obterCpu = this.calcularCpukWh();
    const obterPosCpu = this.calcularPosCpu();
    const obterPreCpu = this.calcularPreCpu();
    const obterEnergiaFaturavel = this.calcularEnergiaFaturavel();
    const obterEnergiaNaoIsentakWh = this.calcularEnergiaNaoIsentakWh();
    const obterCompensadoRoofTop = this.calcularEnergiaCompensadaRoofTopkWh();
    const obterCompensadoTotal = this.calcularCompensadoTotal();
    const obterEnergiaInjetadaRoofTop =
      this.calcularEnergiaInjetadaRoofTopkWh();

    this.balanco.setSaldoAtualkWh(obterSaldoAtual);
    this.balanco.setSaldoAnteriorkWh(obterSaldoAnterior);
    this.balanco.setEnergiaInjetadakWh(obterEnergiaInjetada);
    this.balanco.setSaldoRoofTopkWh(obterSaldoRoofTop);
    this.balanco.setCotaCalculada(obterCotaCalculada);
    this.balanco.setKWhCpu(obterCpu);
    this.balanco.setKWhCpuAtual(obterCpu);
    this.balanco.setPoskWhCpuAtual(obterPosCpu);
    this.balanco.setPrekWhCpuAtual(obterPreCpu);
    this.balanco.setEnergiaFaturavel(obterEnergiaFaturavel);
    this.balanco.setEnergiaNaoIsentakWh(obterEnergiaNaoIsentakWh);
    this.balanco.setEnergiaCompensadaRoofTopkWh(obterCompensadoRoofTop);
    this.balanco.setEnergiaCompensadaTotalkWh(obterCompensadoTotal);
    this.balanco.setEnergiaInjetadaRoofTopkWh(obterEnergiaInjetadaRoofTop);

    return this.balanco;
  }

  abstract calcularAjusteFonteExternakWh(): number;

  abstract calcularSaldoRoofTop(): number;

  abstract calcularCompensadoFonteExternakWh(): number;

  abstract calcularEnergiaNaoIsentakWh(): number;

  abstract calcularEnergiaCompensadaRoofTopkWh(): number;

  abstract calcularEnergiaInjetadaRoofTopkWh(): number;

  protected calcularSaldoAtual(): number {
    if (!this.possuiContaEnergia()) {
      return 0;
    }

    return this.contaEnergia.getSaldoAtualkWh();
  }

  protected calcularSaldoAnterior(): number {
    //todo: VERIFICAR SE EXISTE NO BANCO DE DADOS OU DE CONTAS ENERGIA OU AINDA DE DADOS EXTERNOS

    if (!this.possuiContaEnergia()) {
      this.balanco.setPrekWhCpuAnterior(0);
      this.balanco.setPoskWhCpuAnterior(0);
      this.balanco.setKWhCpuAnterior(0);
      return 0;
    }

    const saldoPreM1 = this.contaEnergia.getSaldoPreAnteriorkWh();
    const saldoPosM1 = this.contaEnergia.getSaldoPosAnteriorkWh();

    this.balanco.setPrekWhCpuAnterior(saldoPreM1);
    this.balanco.setPoskWhCpuAnterior(saldoPosM1);

    this.balanco.setKWhCpuAnterior(saldoPosM1 + saldoPreM1);

    return Calculos.calcularSaldoAtual(saldoPreM1, saldoPosM1);
  }

  protected calcularEnergiaInjetada(): number {
    if (!this.possuiContaEnergia()) {
      return 0;
    }
    const saldoAtual = this.contaEnergia.getSaldoAtualkWh();
    const saldoAnterior = this.calcularSaldoAnterior();
    const compensadoTotal = this.contaEnergia.getCompensadoTotal();

    return Calculos.calcularEnergiaInjetada(
      saldoAtual,
      saldoAnterior,
      compensadoTotal,
      this.calcularAjusteFonteExternakWh()
    );
  }

  protected calcularCota(): number {
    if (!this.possuiContaEnergia()) {
      return 0;
    }

    const energiaInjetada = this.calcularEnergiaInjetada();
    const fazenda = this.fazendaGeracao.calcularGeracaoLiquida();

    return Calculos.calcularCota(energiaInjetada, fazenda);
  }

  protected calcularCpukWh(): number {
    if (!this.possuiContaEnergia()) {
      return 0;
    }
    if (this.deveZerarCpu()) {
      return 0;
    }

    if (this.cpuMaiorIgualPosCpuAnterior()) {
      return this.balanco.getPoskWhCpuAnterior();
    }

    if (!this.possuiContaEnergia) {
      return 0;
    }

    const compensadoTotal = this.contaEnergia.getCompensadoTotal();
    const energiaInjetada = this.calcularEnergiaInjetada();
    const compensadoRoofTop = this.contaEnergia.getCompensadoRoofTopkWh();

    return Calculos.calcularCpukWh(
      compensadoTotal,
      energiaInjetada,
      compensadoRoofTop
    );
  }

  private cpuMaiorIgualPosCpuAnterior(): boolean {
    if (!this.possuiContaEnergia()) {
      return false;
    }

    const compensadoTotal = this.contaEnergia.getCompensadoTotal();
    const energiaInjetada = this.calcularEnergiaInjetada();
    const compensadoRoofTop = this.contaEnergia.getCompensadoRoofTopkWh();

    return Calculos.cpuMaiorIgualPosCpuAnterior(
      compensadoTotal,
      energiaInjetada,
      compensadoRoofTop,
      this.balanco.getPoskWhCpuAnterior()
    );
  }

  private possuiContaEnergia(): boolean {
    this.balanco.setPossuiConta(this.balanco.possuiContaEnergia());
    return this.balanco.possuiContaEnergia();
  }

  private deveZerarCpu(): boolean {
    if (!this.possuiContaEnergia()) {
      return true;
    }

    const possuiContaEnergia = this.balanco.possuiContaEnergia();
    const saldoSaldoAnterior = this.calcularSaldoAnterior();
    const saldoPosCpuAnterior = this.contaEnergia.getSaldoPosAnteriorkWh();
    const saldoAtual = this.contaEnergia.getSaldoAtualkWh();

    return Calculos.deveZerarCpu(
      possuiContaEnergia,
      saldoSaldoAnterior,
      saldoPosCpuAnterior,
      saldoAtual
    );
  }

  private calcularPosCpu(): number {
    if (!this.possuiContaEnergia()) {
      return 0;
    }

    const saldoPosCpuAnterior = this.contaEnergia.getSaldoPosAnteriorkWh();
    const kwhCpu = this.calcularCpukWh();
    const saldoAtual = this.contaEnergia.getSaldoAtualkWh();
    const saldoAnterior = this.calcularSaldoAnterior();
    const saldoRoofTop = this.calcularSaldoRoofTop();

    return Calculos.calcularPosCpu(
      saldoPosCpuAnterior,
      kwhCpu,
      saldoAtual,
      saldoAnterior,
      saldoRoofTop
    );
  }

  private calcularPreCpu(): number {
    if (!this.possuiContaEnergia()) {
      return 0;
    }

    const saldoAtual = this.contaEnergia.getSaldoAtualkWh();
    const posCpu = this.calcularPosCpu();

    return Calculos.calcularPreCpu(saldoAtual, posCpu);
  }

  private calcularCompensadoTotal(): number {
    if (!this.possuiContaEnergia()) {
      return 0;
    }
    return this.contaEnergia.getCompensadoTotal();
  }

  private calcularEnergiaFaturavel(): number {
    if (!this.possuiContaEnergia()) {
      return 0;
    }

    const compensadoTotal = this.contaEnergia.getCompensadoTotal();
    const compensadoFonteExterna = this.calcularCompensadoFonteExternakWh();
    const energiaInjetada = this.calcularEnergiaInjetada();
    const cpu = this.calcularCpukWh();

    return Calculos.calcularEnergiaFaturavel(
      compensadoTotal,
      compensadoFonteExterna,
      energiaInjetada,
      cpu
    );
  }
}
