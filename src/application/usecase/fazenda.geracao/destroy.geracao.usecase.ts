import UseCase from "../../../@shared/usecase/usecase.abstract";
import { inject, injectable } from "inversify";
import FazendaGeracaoFactory, {
  FazendaGeracaoPropsId,
} from "../../../domain/fazenda-geracao/fazenda.geracao.factory";
import IFazendaGeracaoRepository from "../../../domain/fazenda-geracao/fazenda.geracao.repository";
import FazendaGeracaoEntity from "../../../domain/fazenda-geracao/fazenda.geracao.entity";
import NotFoundException from "../../../infra/exceptions/notfound.exception";
import { OutputPadrao } from "../../../@shared/dto/output/output";
import { da } from "@faker-js/faker";

@injectable()
export default class DestroyGeracaoUseCase extends UseCase<
  string,
  OutputPadrao
> {
  constructor(
    @inject("FazendaGeracaoRepository")
    private readonly repository: IFazendaGeracaoRepository
  ) {
    super();
  }

  async execute(data: string): Promise<OutputPadrao> {
    const result = await this.repository.findOneById(data);

    if (!data) {
      throw new NotFoundException("Geração não encontrada");
    }

    await this.repository.delete(result);

    return {
      message: "Geração deletada com sucesso",
      success: true,
    };
  }
}
