import {inject, injectable} from 'inversify'
import UseCase from '../../../@shared/usecase/usecase.abstract'
import type ConcessionariaEntity from '../../../domain/concessionaria/concessionaria.entity'
import IConcessionariaRepository from '../../../domain/concessionaria/concessionaria.repository'
import ConcessionariaFactory from "../../../domain/concessionaria/concessionaria.factory";
import NotFoundException from "../../../infra/exceptions/notfound.exception";

@injectable()
export default class ShowConcessionariaUsecase extends UseCase<string, ConcessionariaEntity> {
    constructor(
        @inject('ConcessionariaRepository') private readonly repository: IConcessionariaRepository
    ) {
        super()
    }

    async execute(input: string): Promise<ConcessionariaEntity> {
        const data = await this.repository.findOneById(input)

        if (!data) {
            throw new NotFoundException('Concessionária não encontrada')
        }

        return ConcessionariaFactory.criarComId(data)
    }
}
