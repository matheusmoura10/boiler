import UseCase from "../../../@shared/usecase/usecase.abstract";
import { inject, injectable } from "inversify";
import FazendaGeracaoFactory, {
  FazendaGeracaoProps,
} from "../../../domain/fazenda-geracao/fazenda.geracao.factory";
import IFazendaGeracaoRepository from "../../../domain/fazenda-geracao/fazenda.geracao.repository";
import FazendaGeracaoEntity from "../../../domain/fazenda-geracao/fazenda.geracao.entity";

@injectable()
export default class InsertGeracaoUseCase extends UseCase<
  FazendaGeracaoProps,
  FazendaGeracaoEntity
> {
  constructor(
    @inject("FazendaGeracaoRepository")
    private readonly repository: IFazendaGeracaoRepository
  ) {
    super();
  }

  async execute(data: FazendaGeracaoProps): Promise<FazendaGeracaoEntity> {
    const entity = FazendaGeracaoFactory.criar(data);
    const model = FazendaGeracaoFactory.entityToModel(entity);
    const result = await this.repository.create(model);

    return FazendaGeracaoFactory.criarComId(result);
  }
}
