import { OutputPadrao } from "../../../@shared/dto/output/output";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import { inject, injectable } from "inversify";
import IFazendaRepository from "../../../domain/fazenda/fazenda.repository";

@injectable()
export default class DestroyFazendaUsecase extends UseCase<
  string,
  OutputPadrao
> {
  constructor(
    @inject("FazendaRepository") private readonly repository: IFazendaRepository
  ) {
    super();
  }

  async execute(data: string): Promise<OutputPadrao> {
    const fazenda = await this.repository.findOneById(data);

    await this.repository.delete(fazenda);

    return { success: true, message: "Fazenda excluída com sucesso" };
  }
}
