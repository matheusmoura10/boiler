import { inject, injectable } from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import { type InputListaPaginada } from "../../../@shared/dto/input/input.dto";
import type OutputListaPaginada from "../../../@shared/dto/output/OutputListaPaginada";
import type ConcessionariaEntity from "../../../domain/concessionaria/concessionaria.entity";
import IConcessionariaRepository from "../../../domain/concessionaria/concessionaria.repository";
import ConcessionariaFactory from "../../../domain/concessionaria/concessionaria.factory";

@injectable()
export default class ListConcessionariaUsecase extends UseCase<
  InputListaPaginada,
  OutputListaPaginada<ConcessionariaEntity>
> {
  constructor(
    @inject("ConcessionariaRepository")
    private readonly repository: IConcessionariaRepository
  ) {
    super();
  }

  async execute(
    input: InputListaPaginada
  ): Promise<OutputListaPaginada<ConcessionariaEntity>> {
    const data = await this.repository.paginate(input);

    return {
      items: data.items.map((item) => {
        return ConcessionariaFactory.criarComId(item);
      }),
      total: data.total,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
    };
  }
}
