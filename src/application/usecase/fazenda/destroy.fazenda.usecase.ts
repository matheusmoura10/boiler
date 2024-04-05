import {OutputPadrao} from "../../../@shared/dto/output/output";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import {inject, injectable} from "inversify";
import IFazendaRepository from "../../../domain/fazenda/fazenda.repository";


@injectable()
export default class DestroyFazendaUsecase extends UseCase<string, OutputPadrao> {
    constructor(
        @inject('FazendaRepository') private readonly repository: IFazendaRepository
    ) {
        super();
    }

    async execute(data: string): Promise<OutputPadrao> {
        await this.repository.delete(data);

        return {success: true, message: 'Fazenda excluída com sucesso'};
    }
}