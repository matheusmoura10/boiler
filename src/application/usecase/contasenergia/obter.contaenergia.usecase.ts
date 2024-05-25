import { inject, injectable } from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import ContaEntity from "../../../domain/contas/conta.entity";
import IContasRepository from "../../../domain/contas/contas.repository";
import ContaFactory from "../../../domain/contas/conta.factory";

export interface ObterContaEnergiaUseCaseProps {
  numeroInstalacao: string;
  referencia: Date;
}

@injectable()
export default class ObterContaEnergiaUseCase extends UseCase<
  ObterContaEnergiaUseCaseProps,
  ContaEntity | null
> {
  constructor(
    @inject("ContasRepository")
    private readonly contasRepository: IContasRepository
  ) {
    super();
  }

  async execute(
    input: ObterContaEnergiaUseCaseProps
  ): Promise<ContaEntity | null> {
    const model =
      await this.contasRepository.findByNumeroInstalacaoAndReferencia(
        input.numeroInstalacao,
        input.referencia
      );

    if (!model) {
      return null;
    }

    return ContaFactory.fromModel(model);
  }
}
