import {inject, injectable} from "inversify";
import UseCase from "../../../@shared/usecase/usecase.abstract";
import {InserirConcessionariaInput} from "./dto/input";
import ConcessionariaFactory from "../../../domain/concessionaria/concessionaria.factory";
import IConcessionariaRepository from "../../../domain/concessionaria/concessionaria.repository";
import ConcessionariaEntity from "../../../domain/concessionaria/concessionaria.entity";

@injectable()
export default class SaveConcessionariaUsecase extends UseCase<InserirConcessionariaInput, ConcessionariaEntity> {

    constructor(
        @inject('ConcessionariaRepository') private readonly repository: IConcessionariaRepository
    ) {
        super();
    }


    async execute(data: InserirConcessionariaInput): Promise<ConcessionariaEntity> {


        const entity = ConcessionariaFactory.criar({
            nome: data.nome,
            estado: data.estado
        });

        const model = ConcessionariaFactory.entityToModel(entity);
        const result = await this.repository.create(model)

        return ConcessionariaFactory.criarComId({
            id: result.id,
            nome: result.nome,
            estado: result.estado
        });


    }
}