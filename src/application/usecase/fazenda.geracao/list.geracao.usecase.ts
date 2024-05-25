import OutputListaPaginada from "../../../@shared/dto/output/OutputListaPaginada";
import { InputListaPaginada } from "../../../@shared/dto/input/input.dto";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import { inject, injectable } from "inversify";
import IFazendaGeracaoRepository from "../../../domain/fazenda-geracao/fazenda.geracao.repository";
import FazendaGeracaoFactory from "../../../domain/fazenda-geracao/fazenda.geracao.factory";
import FazendaGeracaoEntity from "../../../domain/fazenda-geracao/fazenda.geracao.entity";

@injectable()
export default class ListGeracaoUseCase extends UseCase<
  InputListaPaginada,
  OutputListaPaginada<FazendaGeracaoEntity>
> {
  constructor(
    @inject("FazendaGeracaoRepository")
    private readonly repository: IFazendaGeracaoRepository
  ) {
    super();
  }

  async execute(
    data: InputListaPaginada
  ): Promise<OutputListaPaginada<FazendaGeracaoEntity>> {
    const result = await this.repository.paginate(data, [
      "fazenda.concessionaria",
    ]);

    return {
      items: result.items
        ? result.items.map((item) => FazendaGeracaoFactory.criarComId(item))
        : [],
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      total: result.total,
    };
  }
}
