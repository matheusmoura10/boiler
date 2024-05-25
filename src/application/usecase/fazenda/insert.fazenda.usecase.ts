import UseCase from "../../../@shared/usecase/usecase.abstract";
import {inject, injectable} from "inversify";
import FazendaFactory, {FazendaProps} from "../../../domain/fazenda/fazenda.factory";
import FazendaEntity from "../../../domain/fazenda/fazenda.entity";
import IFazendaRepository from "../../../domain/fazenda/fazenda.repository";

@injectable()
export default class InsertFazendaUsecase extends UseCase<FazendaProps, FazendaEntity> {

    constructor(
        @inject('FazendaRepository') private readonly repository: IFazendaRepository
    ) {
        super();
    }

    async execute(data: FazendaProps): Promise<FazendaEntity> {

        const entity = FazendaFactory.criar(data);
        const model = FazendaFactory.entityToModel(entity);
        const result = await this.repository.create(model);

        return FazendaFactory.criarComId(result);
    }
}