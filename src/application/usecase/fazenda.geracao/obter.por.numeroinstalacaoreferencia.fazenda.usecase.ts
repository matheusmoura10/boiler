import { inject } from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import FazendaGeracaoEntity from "../../../domain/fazenda-geracao/fazenda.geracao.entity";
import IFazendaGeracaoRepository from "../../../domain/fazenda-geracao/fazenda.geracao.repository";
import FazendaGeracaoFactory from "../../../domain/fazenda-geracao/fazenda.geracao.factory";
import FazendaEntity from "../../../domain/fazenda/fazenda.entity";

export interface ObterPorNumeroInstalacaoReferenciaGeracaoUseCaseProps {
  fazendaEntity: FazendaEntity;
  referencia: Date;
}

export default class ObterPorNumeroInstalacaoReferenciaGeracaoUseCase extends UseCase<
  ObterPorNumeroInstalacaoReferenciaGeracaoUseCaseProps,
  FazendaGeracaoEntity
> {
  constructor(
    @inject("FazendaGeracaoRepository")
    private readonly repository: IFazendaGeracaoRepository
  ) {
    super();
  }

  async execute(
    data: ObterPorNumeroInstalacaoReferenciaGeracaoUseCaseProps
  ): Promise<FazendaGeracaoEntity> {
    const result = await this.repository.findByFazendaGeracaoReferencia(
      data.referencia,
      data.fazendaEntity
    );

    return FazendaGeracaoFactory.modelToEntity(result);
  }
}
