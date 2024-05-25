import UseCase from "../../../@shared/usecase/usecase.abstract";
import { inject, injectable } from "inversify";
import FazendaGeracaoFactory, {
  FazendaGeracaoPropsId,
} from "../../../domain/fazenda-geracao/fazenda.geracao.factory";
import IFazendaGeracaoRepository from "../../../domain/fazenda-geracao/fazenda.geracao.repository";
import FazendaGeracaoEntity from "../../../domain/fazenda-geracao/fazenda.geracao.entity";
import NotFoundException from "../../../infra/exceptions/notfound.exception";

@injectable()
export default class UpdateGeracaoUseCase extends UseCase<
  FazendaGeracaoPropsId,
  FazendaGeracaoEntity
> {
  constructor(
    @inject("FazendaGeracaoRepository")
    private readonly repository: IFazendaGeracaoRepository
  ) {
    super();
  }

  async execute(data: FazendaGeracaoPropsId): Promise<FazendaGeracaoEntity> {
    const exists = await this.repository.exists(data.id);

    if (!exists) {
      throw new NotFoundException("Geração não encontrada");
    }

    const entity = FazendaGeracaoFactory.criarComId(data);
    const model = FazendaGeracaoFactory.entityToModel(entity);
    const result = await this.repository.update(model);

    return FazendaGeracaoFactory.criarComId(result);
  }
}
