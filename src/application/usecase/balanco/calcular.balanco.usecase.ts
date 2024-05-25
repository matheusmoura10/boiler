import { inject } from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import BalancoEnergiaFactory from "../../../domain/balanco/factories/balanco.energia.factory";
import CalculoBalancoFactory from "../../../domain/balanco/calculos/calculo.balanco.factory";
import ShowCotaUseCase from "../cotas/show.cota.usecase";
import CotasEntity from "../../../domain/cotas/cotas.entity";
import ObterPorNumeroInstalacaoFazendaUseCase from "../fazenda/obter.por.numeroinstalacao.fazenda.usecase";
import FazendaEntity from "../../../domain/fazenda/fazenda.entity";
import ObterPorNumeroInstalacaoReferenciaGeracaoUseCase from "../fazenda.geracao/obter.por.numeroinstalacaoreferencia.fazenda.usecase";
import FazendaGeracaoEntity from "../../../domain/fazenda-geracao/fazenda.geracao.entity";
import ObterContaEnergiaUseCase from "../contasenergia/obter.contaenergia.usecase";
import AnaliseBalancoUseCase from "./analise.balanco.usecase";
import AnaliseBalancoEntity from "../../../domain/balanco/entities/balanco.analise.entity";
import CalculaResultado from "../../../domain/balanco/resultados/calcula.resultado";
import BalancoEntiy from "../../../domain/balanco/entities/balanco.entity";
import BalancoFactory from "../../../domain/balanco/factories/balanco.factory";
import ConsolidarBalancoUseCase from "./consolidar.balanco.usecase";
import PersistirBalancoUseCase from "./persistir.balanco.usecase";

export interface CalcularBalancoUseCaseProps {
  referencia: Date;
  contratoId: string;
}

export default class CalcularBalancoUseCase extends UseCase<
  CalcularBalancoUseCaseProps,
  BalancoEntiy
> {
  constructor(
    @inject("PersistirBalancoUseCase")
    private readonly persistirBalancoUseCase: PersistirBalancoUseCase,
    @inject("ShowCotaUseCase")
    private readonly showCotaUseCase: ShowCotaUseCase,
    @inject("ObterPorNumeroInstalacaoFazendaUseCase")
    private readonly obterPorNumeroInstalacaoFazendaUseCase: ObterPorNumeroInstalacaoFazendaUseCase,
    @inject("ObterPorNumeroInstalacaoReferenciaGeracaoUseCase")
    private readonly obterPorNumeroInstalacaoReferenciaGeracaoUseCase: ObterPorNumeroInstalacaoReferenciaGeracaoUseCase,
    @inject("ObterContaEnergiaUseCase")
    private readonly obterContaEnergiaUseCase: ObterContaEnergiaUseCase,
    @inject("AnaliseBalancoUseCase")
    private readonly analiseBalancoUseCase: AnaliseBalancoUseCase,
    @inject("ConsolidarBalancoUseCase")
    private readonly consolidarBalancoUseCase: ConsolidarBalancoUseCase
  ) {
    super();
  }

  async execute(data: CalcularBalancoUseCaseProps): Promise<BalancoEntiy> {
    const cotaEntity: CotasEntity = await this.showCotaUseCase.execute({
      contrato: parseInt(data.contratoId),
      referencia: data.referencia,
    });

    const fazenda: FazendaEntity =
      await this.obterPorNumeroInstalacaoFazendaUseCase.execute(
        cotaEntity.getNumeroInstalacaoFazenda()
      );

    const fazendaGeracao: FazendaGeracaoEntity =
      await this.obterPorNumeroInstalacaoReferenciaGeracaoUseCase.execute({
        fazendaEntity: fazenda,
        referencia: data.referencia,
      });

    const contaEnergiaEntity = await this.obterContaEnergiaUseCase.execute({
      numeroInstalacao: cotaEntity.getNumeroInstalacao(),
      referencia: data.referencia,
    });

    const balancoEnergia = BalancoEnergiaFactory.criar({
      referencia: data.referencia,
      cota: cotaEntity,
      fazenda: fazendaGeracao,
      contaEnergia: contaEnergiaEntity,
    });

    const calculoBalancoFactory =
      CalculoBalancoFactory.obterClasseParaCalculo(balancoEnergia);

    const balancoSalvo = await this.persistirBalancoUseCase.execute(
      calculoBalancoFactory.calcular()
    );

    const analise: AnaliseBalancoEntity =
      await this.analiseBalancoUseCase.execute({
        balanco: balancoSalvo,
      });

    const calcularResultado = new CalculaResultado(analise);
    const verificaResultadoBalanco = calcularResultado.calcularResultado();

    const balanco: BalancoEntiy = BalancoFactory.criar({
      referencia: data.referencia,
      contrato: cotaEntity.getContrato(),
      numeroInstalacao: cotaEntity.getNumeroInstalacao(),
      energia: balancoSalvo,
      analise: analise,
      dadosExternos: undefined,
      fazendaGeracao: fazendaGeracao,
      cota: cotaEntity,
      contaEnergia: contaEnergiaEntity,
      balancoAnterior: undefined,
      resultadoBalanco: verificaResultadoBalanco,
      possuiConta: balancoSalvo.possuiContaEnergia(),
    });

    await this.consolidarBalancoUseCase.execute(balanco);

    return balanco;
  }
}
