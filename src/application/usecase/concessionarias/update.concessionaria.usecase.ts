import {inject, injectable} from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import {AtualizarConcessionariaInput} from "./dto/input";
import ConcessionariaFactory from "../../../domain/concessionaria/concessionaria.factory";
import IConcessionariaRepository from "../../../domain/concessionaria/concessionaria.repository";
import ConcessionariaEntity from "../../../domain/concessionaria/concessionaria.entity";
import NotFoundException from "../../../infra/exceptions/notfound.exception";


@injectable()
export default class UpdateConcessionariaUsecase extends UseCase<AtualizarConcessionariaInput, ConcessionariaEntity> {

    constructor(
        @inject('ConcessionariaRepository') private readonly repository: IConcessionariaRepository,
    ) {
        super();
    }

    async execute(input: AtualizarConcessionariaInput): Promise<ConcessionariaEntity> {

        const exists = await this.repository.findOneById(input.id);

        if (!exists) {
            throw new NotFoundException('Concessionária não encontrada')
        }

        const entity = ConcessionariaFactory.criarComId(input);
        const model = ConcessionariaFactory.entityToModel(entity);
        await this.repository.update(model)

        return entity;

    }
}