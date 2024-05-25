import { inject, injectable } from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import BalancoEntiy from "../../../domain/balanco/entities/balanco.entity";
import { In } from "typeorm";
import IBalancoRepository from "../../../domain/balanco/repositories/balanco.repository";
import BalancoFactory from "../../../domain/balanco/factories/balanco.factory";

@injectable()
export default class ConsolidarBalancoUseCase extends UseCase<
  BalancoEntiy,
  boolean
> {
  constructor(
    @inject("BalancoRepository")
    private readonly balancoRepository: IBalancoRepository
  ) {
    super();
  }

  async execute(input: BalancoEntiy): Promise<boolean> {
    const model = BalancoFactory.entityToModel(input);

    const balanco = await this.balancoRepository.atualizarOuCriar(model);

    return Promise.resolve(true);
  }
}
