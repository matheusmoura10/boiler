import { inject, injectable } from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import { OutputPadrao } from "../../../@shared/dto/output/output";
import IConcessionariaRepository from "../../../domain/concessionaria/concessionaria.repository";
import NotFoundException from "../../../infra/exceptions/notfound.exception";

@injectable()
export default class DestroyConcessionariaUsecase extends UseCase<
  string,
  OutputPadrao
> {
  constructor(
    @inject("ConcessionariaRepository")
    private readonly repository: IConcessionariaRepository
  ) {
    super();
  }

  async execute(input: string): Promise<OutputPadrao> {
    const concessionaria = await this.repository.findOneById(input);

    if (!concessionaria) {
      throw new NotFoundException("Concessionária não encontrada");
    }

    await this.repository.delete(concessionaria);

    return {
      success: true,
      message: "Concessionária excluída com sucesso",
    };
  }
}
