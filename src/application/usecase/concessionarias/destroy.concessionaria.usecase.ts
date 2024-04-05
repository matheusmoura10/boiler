import {inject, injectable} from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import {OutputPadrao} from "../../../@shared/dto/output/output";
import IConcessionariaRepository from "../../../domain/concessionaria/concessionaria.repository";
import NotFoundException from "../../../infra/exceptions/notfound.exception";


@injectable()
export default class DestroyConcessionariaUsecase extends UseCase<string, OutputPadrao> {

    constructor(
        @inject('ConcessionariaRepository') private readonly repository: IConcessionariaRepository
    ) {
        super();
    }

    async execute(input: string): Promise<OutputPadrao> {

        const exists = await this.repository.findOneById(input);

        if (!exists) {
            throw new NotFoundException('Concessionária não encontrada');
        }

        await this.repository.delete(input);

        return {
            success: true,
            message: 'Concessionária excluída com sucesso'
        }
    }
}