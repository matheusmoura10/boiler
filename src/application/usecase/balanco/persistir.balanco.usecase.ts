import { inject, injectable } from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import BalancoEnergiaEntity from "../../../domain/balanco/entities/balanco.energia.entity";
import BalancoEnergiaRepository from "../../../infra/repository/balanco.energia.repository";
import BalancoEnergiaFactory from "../../../domain/balanco/factories/balanco.energia.factory";

@injectable()
export default class PersistirBalancoUseCase extends UseCase<
  BalancoEnergiaEntity,
  BalancoEnergiaEntity
> {
  private readonly balancoRepository: BalancoEnergiaRepository;

  constructor(
    @inject("BalancoEnergiaRepository")
    balancoRepository: BalancoEnergiaRepository
  ) {
    super();
    this.balancoRepository = balancoRepository;
  }

  async execute(data: BalancoEnergiaEntity): Promise<BalancoEnergiaEntity> {
    const resultModel = await this.balancoRepository.atualizarOuInserir(
      BalancoEnergiaFactory.toModel(data)
    );

    return BalancoEnergiaFactory.toEntity(resultModel);
  }
}
