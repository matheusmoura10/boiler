import UseCase from "../../../@shared/usecase/usecase.abstract";
import {inject, injectable} from "inversify";
import IFazendaRepository from "../../../domain/fazenda/fazenda.repository";
import FazendaEntity from "../../../domain/fazenda/fazenda.entity";
import FazendaFactory, {FazendaPropsId} from "../../../domain/fazenda/fazenda.factory";
import NotFoundException from "../../../infra/exceptions/notfound.exception";
import {FazendaEnum} from "../../enum/FazendaEnum";

@injectable()
export default class ShowFazendaUsecase extends UseCase<string, FazendaEntity> {
    constructor(
        @inject('FazendaRepository') private readonly repository: IFazendaRepository,
    ) {
        super();
    }

    async execute(data: string): Promise<any> {
        const exists = await this.repository.exists(data);

        if (!exists) {
            throw new NotFoundException(FazendaEnum.FAZENDA_NAO_ENCONTRADA);
        }

        const result = await this.repository.findOneByIdWithRelations(data, ['concessionaria']);

        return FazendaFactory.criarComId({
            nome: result.nome,
            unidadeGeradora: result.unidadeGeradora,
            numeroInstalacao: result.numeroInstalacao,
            numeroCliente: result.numeroCliente,
            notaServico: result.notaServico,
            potenciaInstalada: result.potenciaInstalada,
            dataConexao: result.dataConexao,
            concessionaria: result.concessionaria,
            tipoDesvioCota: result.tipoDesvioCota,
            limiteDesvioCota: result.limiteDesvioCota,
            fonteEnergia: result.fonteEnergia,
            id: result.id
        } as FazendaPropsId)
    }
}