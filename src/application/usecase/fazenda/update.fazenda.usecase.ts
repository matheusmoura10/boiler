import FazendaFactory, {FazendaPropsId} from "../../../domain/fazenda/fazenda.factory";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import {inject, injectable} from "inversify";
import IFazendaRepository from "../../../domain/fazenda/fazenda.repository";
import FazendaEntity from "../../../domain/fazenda/fazenda.entity";
import NotFoundException from "../../../infra/exceptions/notfound.exception";
import {FazendaEnum} from "../../enum/FazendaEnum";

@injectable()
export default class UpdateFazendaUsecase extends UseCase<FazendaPropsId, FazendaEntity> {

    constructor(
        @inject('FazendaRepository') private readonly repository: IFazendaRepository
    ) {
        super();
    }

    async execute(data: FazendaPropsId): Promise<FazendaEntity> {

        const exists = await this.repository.exists(data.id);

        if (!exists) {
            throw new NotFoundException(FazendaEnum.FAZENDA_NAO_ENCONTRADA);
        }
        const entity = FazendaFactory.criarComId(data);

        const model = FazendaFactory.entityToModel(entity);
        const result = await this.repository.update(model);

        return FazendaFactory.modelToEntity(result);
    }
}