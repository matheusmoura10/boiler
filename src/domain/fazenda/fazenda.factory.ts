import {v4 as uuid} from "uuid";
import ConcessionariaFactory, {ConcessionariaPropsWithId} from "../concessionaria/concessionaria.factory";
import FazendaEntity from "./fazenda.entity";
import {FazendaModel} from "../../infra/data/models/fazenda.model";

export interface FazendaProps {
    nome: string
    unidadeGeradora: string
    numeroInstalacao: string
    numeroCliente: string
    notaServico: string
    potenciaInstalada: number
    dataConexao: Date
    concessionaria: ConcessionariaPropsWithId
    tipoDesvioCota: string
    limiteDesvioCota: number
    fonteEnergia: string
}

export interface FazendaPropsId extends FazendaProps {
    id: string
}

export default class FazendaFactory {

    static criar(data: FazendaProps): FazendaEntity {
        return new FazendaEntity(
            uuid(),
            data.nome,
            data.unidadeGeradora,
            data.numeroInstalacao,
            data.numeroCliente,
            data.notaServico,
            data.potenciaInstalada,
            data.dataConexao,
            ConcessionariaFactory.criarComId(data.concessionaria),
            data.tipoDesvioCota,
            data.limiteDesvioCota,
            data.fonteEnergia
        )
    }

    static criarComId(data: FazendaPropsId): FazendaEntity {
        return new FazendaEntity(
            data.id,
            data.nome,
            data.unidadeGeradora,
            data.numeroInstalacao,
            data.numeroCliente,
            data.notaServico,
            data.potenciaInstalada,
            data.dataConexao,
            ConcessionariaFactory.criarComId(data.concessionaria),
            data.tipoDesvioCota,
            data.limiteDesvioCota,
            data.fonteEnergia
        )
    }

    static entityToModel(entity: FazendaEntity): FazendaModel {
        const concessionaria = ConcessionariaFactory.entityToModel(entity.getConcessionaria)

        const fazendaModel = new FazendaModel()
        fazendaModel.id = entity.getId
        fazendaModel.nome = entity.getNome
        fazendaModel.unidadeGeradora = entity.getUnidadeGeradora
        fazendaModel.numeroInstalacao = entity.getNumeroInstalacao
        fazendaModel.numeroCliente = entity.getNumeroCliente
        fazendaModel.notaServico = entity.getNotaServico
        fazendaModel.potenciaInstalada = entity.getPotenciaInstalada
        fazendaModel.dataConexao = entity.getDataConexao
        fazendaModel.concessionaria = concessionaria
        fazendaModel.tipoDesvioCota = entity.getTipoDesvioCota
        fazendaModel.limiteDesvioCota = entity.getLimiteDesvioCota
        fazendaModel.fonteEnergia = entity.getFonteEnergia
        return fazendaModel
    }

    static modelToEntity(model: FazendaModel): FazendaEntity {
        return new FazendaEntity(
            model.id,
            model.nome,
            model.unidadeGeradora,
            model.numeroInstalacao,
            model.numeroCliente,
            model.notaServico,
            model.potenciaInstalada,
            model.dataConexao,
            ConcessionariaFactory.modelToEntity(model.concessionaria),
            model.tipoDesvioCota,
            model.limiteDesvioCota,
            model.fonteEnergia
        )
    }
}
