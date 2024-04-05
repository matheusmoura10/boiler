import {BaseEntity} from '../../@shared/entities/base.entity'
import ConcessionariaEntity from "../concessionaria/concessionaria.entity";
import DomainException from "../../@shared/exceptions/domain.exception";

export default class FazendaEntity extends BaseEntity {
    private readonly nome: string
    private readonly unidadeGeradora: string
    private readonly numeroInstalacao: string
    private readonly numeroCliente: string
    private readonly notaServico: string
    private readonly potenciaInstalada: number
    private readonly dataConexao: Date
    private readonly concessionaria: ConcessionariaEntity
    private readonly tipoDesvioCota: string
    private readonly limiteDesvioCota: number
    private readonly fonteEnergia: string


    constructor(id: string, nome: string, unidadeGeradora: string, numeroInstalacao: string, numeroCliente: string, notaServico: string, potenciaInstalada: number, dataConexao: Date, concessionaria: ConcessionariaEntity, tipoDesvioCota: string, limiteDesvioCota: number, fonteEnergia: string) {
        super(
            id
        );
        this.nome = nome;
        this.unidadeGeradora = unidadeGeradora;
        this.numeroInstalacao = numeroInstalacao;
        this.numeroCliente = numeroCliente;
        this.notaServico = notaServico;
        this.potenciaInstalada = potenciaInstalada;
        this.dataConexao = dataConexao;
        this.concessionaria = concessionaria;
        this.tipoDesvioCota = tipoDesvioCota;
        this.limiteDesvioCota = limiteDesvioCota;
        this.fonteEnergia = fonteEnergia;

        this.validar();
    }

    get getNome(): string {
        return this.nome;
    }

    get getUnidadeGeradora(): string {
        return this.unidadeGeradora;
    }

    get getNumeroInstalacao(): string {
        return this.numeroInstalacao;
    }

    get getNumeroCliente(): string {
        return this.numeroCliente;
    }

    get getNotaServico(): string {
        return this.notaServico;
    }

    get getPotenciaInstalada(): number {
        return this.potenciaInstalada;
    }

    get getDataConexao(): Date {
        return this.dataConexao;
    }

    get getConcessionaria(): ConcessionariaEntity {
        return this.concessionaria;
    }

    get getTipoDesvioCota(): string {
        return this.tipoDesvioCota;
    }

    get getLimiteDesvioCota(): number {
        return this.limiteDesvioCota;
    }

    get getFonteEnergia(): string {
        return this.fonteEnergia;
    }

    validar(): void {
        const erros: Map<string, string> = new Map<string, string>();

        if (!this.nome) {
            erros.set('nome', 'Nome é obrigatório');
        }

        if (!this.unidadeGeradora) {
            erros.set('unidadeGeradora', 'Unidade Geradora é obrigatório');
        }

        if (!this.numeroInstalacao) {
            erros.set('numeroInstalacao', 'Número de Instalação é obrigatório');
        }

        if (!this.numeroCliente) {
            erros.set('numeroCliente', 'Número do Cliente é obrigatório');
        }

        if (!this.notaServico) {
            erros.set('notaServico', 'Nota de Serviço é obrigatório');
        }

        if (!this.potenciaInstalada) {
            erros.set('potenciaInstalada', 'Potência Instalada é obrigatório');
        }

        if (!this.dataConexao) {
            erros.set('dataConexao', 'Data de Conexão é obrigatório');
        }

        if (!this.concessionaria || !this.concessionaria.getId) {
            erros.set('concessionaria', 'Concessionária é obrigatório');
        }

        if (!this.tipoDesvioCota) {
            erros.set('tipoDesvioCota', 'Tipo de Desvio de Cota é obrigatório');
        }

        if (!this.limiteDesvioCota) {
            erros.set('limiteDesvioCota', 'Limite de Desvio de Cota é obrigatório');
        }

        if (!this.fonteEnergia) {
            erros.set('fonteEnergia', 'Fonte de Energia é obrigatório');
        }

        if (erros.size) {
            throw new DomainException('Erro a montar o dominio' + this.constructor.name, erros);
        }
    }

}
