import {BaseEntity} from "../../@shared/entities/base.entity";
import FazendaEntity from "../fazenda/fazenda.entity";
import DomainException from "../../@shared/exceptions/domain.exception";

export default class FazendaGeracaoEntity extends BaseEntity {

    private referencia: Date;
    private fazenda: FazendaEntity;
    private dataLeitura: Date;
    private demandaKWH: number;
    private tarifaDemanda: number;
    private energiaInjetadaHFP: number;
    private autoConsumoHFP: number;
    private saldoGeracaoHFP: number;
    private energiaInjetadaHP: number;
    private autoConsumoHP: number;
    private saldoGeracaoHP: number;

    constructor(
        id: string,
        referencia: Date,
        fazenda: FazendaEntity,
        dataLeitura: Date,
        demandaKWH: number,
        tarifaDemanda: number,
        energiaInjetadaHFP: number,
        autoConsumoHFP: number,
        saldoGeracaoHFP: number,
        energiaInjetadaHP: number,
        autoConsumoHP: number,
        saldoGeracaoHP: number
    ) {
        super(id);
        this.referencia = referencia;
        this.fazenda = fazenda;
        this.dataLeitura = dataLeitura;
        this.demandaKWH = demandaKWH;
        this.tarifaDemanda = tarifaDemanda;
        this.energiaInjetadaHFP = energiaInjetadaHFP;
        this.autoConsumoHFP = autoConsumoHFP;
        this.saldoGeracaoHFP = saldoGeracaoHFP;
        this.energiaInjetadaHP = energiaInjetadaHP;
        this.autoConsumoHP = autoConsumoHP;
        this.saldoGeracaoHP = saldoGeracaoHP;
    }

    get getReferencia(): Date {
        return this.referencia;
    }

    get getFazenda(): FazendaEntity {
        return this.fazenda;
    }

    get getDataLeitura(): Date {
        return this.dataLeitura;
    }

    get getDemandaKw(): number {
        return this.demandaKWH;
    }

    get getTarifaDemanda(): number {
        return this.tarifaDemanda;
    }

    get getEnergiaInjetadaHFP(): number {
        return this.energiaInjetadaHFP;
    }

    get getAutoConsumoHFP(): number {
        return this.autoConsumoHFP;
    }

    get getSaldoGeracaoHFP(): number {
        return this.saldoGeracaoHFP;
    }

    get getEnergiaInjetadaHP(): number {
        return this.energiaInjetadaHP;
    }

    get getAutoConsumoHP(): number {
        return this.autoConsumoHP;
    }

    get getSaldoGeracaoHP(): number {
        return this.saldoGeracaoHP;
    }

    validar(): void {
        const erros: Map<string, string> = new Map<string, string>();

        if (!this.referencia) {
            erros.set('referencia', 'Referência não informada');
        }

        if (!this.fazenda) {
            erros.set('fazenda', 'Fazenda não informada');
        }

        if (!this.dataLeitura) {
            erros.set('dataLeitura', 'Data de Leitura não informada');
        }

        if (!this.demandaKWH) {
            erros.set('demandaKWH', 'Demanda em kW não informada');
        }

        if (!this.tarifaDemanda) {
            erros.set('tarifaDemanda', 'Tarifa de Demanda não informada');
        }

        if (!this.energiaInjetadaHFP) {
            erros.set('energiaInjetadaHFP', 'Energia Injetada HFP não informada');
        }

        if (!this.autoConsumoHFP) {
            erros.set('autoConsumoHFP', 'Auto Consumo HFP não informado');
        }

        if (!this.saldoGeracaoHFP) {
            erros.set('saldoGeracaoHFP', 'Saldo de Geração HFP não informado');
        }

        if (!this.energiaInjetadaHP) {
            erros.set('energiaInjetadaHP', 'Energia Injetada HP não informada');
        }

        if (!this.autoConsumoHP) {
            erros.set('autoConsumoHP', 'Auto Consumo HP não informado');
        }

        if (!this.saldoGeracaoHP) {
            erros.set('saldoGeracaoHP', 'Saldo de Geração HP não informado');
        }

        if (erros.size > 0) {
            throw new DomainException('Erro a montar o dominio' + this.constructor.name, erros);
        }
    }


}