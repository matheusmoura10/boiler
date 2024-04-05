import {BaseEntity} from '../../@shared/entities/base.entity'
import DomainException from "../../@shared/exceptions/domain.exception";

export default class ConcessionariaEntity extends BaseEntity {

    private nome: string;
    private estado: string;

    constructor(id: string, nome: string, estado: string) {
        super(
            id
        );
        this.nome = nome;
        this.estado = estado;

        this.validar();
    }

    get getNome(): string {
        return this.nome;
    }

    get getEstado(): string {
        return this.estado;
    }

    validar(): void {
        const erros: Map<string, string> = new Map<string, string>();

        if (!this.nome) {
            erros.set('nome', 'Nome é obrigatório');
        }

        if (!this.estado) {
            erros.set('estado', 'Estado é obrigatório');
        }

        if (erros.size) {
            throw new DomainException('Erro a montar o dominio:' + this.constructor.name, erros);
        }
    }
}
