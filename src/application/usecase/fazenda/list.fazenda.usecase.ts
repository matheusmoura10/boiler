import OutputListaPaginada from "../../../@shared/dto/output/OutputListaPaginada";
import FazendaEntity from "../../../domain/fazenda/fazenda.entity";
import {InputListaPaginada} from "../../../@shared/dto/input/input.dto";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import {inject, injectable} from "inversify";
import IFazendaRepository from "../../../domain/fazenda/fazenda.repository";
import FazendaFactory from "../../../domain/fazenda/fazenda.factory";

@injectable()
export default class ListFazendaUsecase extends UseCase<InputListaPaginada, OutputListaPaginada<FazendaEntity>> {
    constructor(
        @inject('FazendaRepository') private readonly repository: IFazendaRepository
    ) {
        super();
    }

    async execute(data: InputListaPaginada): Promise<OutputListaPaginada<FazendaEntity>> {
        const result = await this.repository.paginate(data, ['concessionaria']);
        
        return {
            items: result.items ? result.items.map((item) => FazendaFactory.modelToEntity(item)) : [],
            currentPage: result.currentPage,
            totalPages: result.totalPages,
            total: result.total
        }
    }
}