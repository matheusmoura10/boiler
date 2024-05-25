import { inject, injectable } from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import CotasEntity from "../../../domain/cotas/cotas.entity";
import ICotasRepository from "../../../domain/cotas/cotas.repository";
import CotasFactory from "../../../domain/cotas/cotas.factory";

export interface ShowCotaUseCaseProps {
  contrato: number;
  referencia: Date;
}

@injectable()
export default class ShowCotaUseCase extends UseCase<
  ShowCotaUseCaseProps,
  CotasEntity
> {
  private readonly cotasRepository: ICotasRepository;

  constructor(@inject("CotasRepository") cotasRepository: ICotasRepository) {
    super();
    this.cotasRepository = cotasRepository;
  }

  async execute(input: ShowCotaUseCaseProps): Promise<CotasEntity> {
    const cota = await this.cotasRepository.obterCotaPorContratoEData(
      input.contrato,
      input.referencia
    );

    return CotasFactory.toEntity(cota);
  }
}
