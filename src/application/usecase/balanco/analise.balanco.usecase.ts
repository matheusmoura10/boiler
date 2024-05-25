import { inject, injectable } from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import BalancoEnergiaEntity from "../../../domain/balanco/entities/balanco.energia.entity";
import BalancoAnaliseFactory from "../../../domain/balanco/calculos/analise.balanco.factory";
import IAnaliseBalancoRepository from "../../../domain/balanco/repositories/balanco.analise.repository";

export interface AnaliseBalancoProps {
  balanco: BalancoEnergiaEntity;
}

@injectable()
export default class AnaliseBalancoUseCase extends UseCase<
  AnaliseBalancoProps,
  any
> {
  constructor(
    @inject("BalancoAnaliseRepository")
    private repository: IAnaliseBalancoRepository
  ) {
    super();
  }

  async execute(input: AnaliseBalancoProps): Promise<any> {
    const entity = BalancoAnaliseFactory.criarAnaliseBalanco(input.balanco);
    const model = BalancoAnaliseFactory.criarModel(entity);
    const result = await this.repository.atualizarOuInserir(model);

    return BalancoAnaliseFactory.toEntity(result);
  }
}
