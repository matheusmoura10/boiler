import UseCase from "../../../@shared/usecase/usecase.abstract";
import { inject, injectable } from "inversify";
import FazendaGeracaoFactory from "../../../domain/fazenda-geracao/fazenda.geracao.factory";
import IFazendaGeracaoRepository from "../../../domain/fazenda-geracao/fazenda.geracao.repository";
import FazendaGeracaoEntity from "../../../domain/fazenda-geracao/fazenda.geracao.entity";
import NotFoundException from "../../../infra/exceptions/notfound.exception";

@injectable()
export default class ShowGeracaoUseCase extends UseCase<
  string,
  FazendaGeracaoEntity
> {
  constructor(
    @inject("FazendaGeracaoRepository")
    private readonly repository: IFazendaGeracaoRepository
  ) {
    super();
  }

  async execute(data: string): Promise<FazendaGeracaoEntity> {
    const result = await this.repository.findOneByIdWithRelations(data, [
      "fazenda",
      "fazenda.concessionaria",
    ]);

    if (!result) {
      throw new NotFoundException("Geração não encontrada");
    }

    return FazendaGeracaoFactory.criarComId(result);
  }
}
