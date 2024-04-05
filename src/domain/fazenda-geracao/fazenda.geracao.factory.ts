import FazendaFactory, {FazendaPropsId} from "../fazenda/fazenda.factory";
import {v4 as uuid} from "uuid";
import FazendaGeracaoEntity from "./fazenda.geracao.entity";

export interface FazendaGeracaoProps {
    referencia: Date;
    fazenda: FazendaPropsId;
    dataLeitura: Date;
    demandaKwH: number;
    tarifaDemanda: number;
    energiaInjetadaHFP: number;
    autoConsumoHFP: number;
    saldoGeracaoHFP: number;
    energiaInjetadaHP: number;
    autoConsumoHP: number;
    saldoGeracaoHP: number;
}

export interface FazendaGeracaoPropsId extends FazendaGeracaoProps {
    id: string
}

export default class FazendaGeracaoFactory {

    static criar(data: FazendaGeracaoProps): FazendaGeracaoEntity {
        return new FazendaGeracaoEntity(
            uuid(),
            data.referencia,
            FazendaFactory.criarComId(data.fazenda),
            data.dataLeitura,
            data.demandaKwH,
            data.tarifaDemanda,
            data.energiaInjetadaHFP,
            data.autoConsumoHFP,
            data.saldoGeracaoHFP,
            data.energiaInjetadaHP,
            data.autoConsumoHP,
            data.saldoGeracaoHP,
        )
    }

    static criarComId(data: FazendaGeracaoPropsId): FazendaGeracaoEntity {
        return new FazendaGeracaoEntity(
            data.id,
            data.referencia,
            FazendaFactory.criarComId(data.fazenda),
            data.dataLeitura,
            data.demandaKwH,
            data.tarifaDemanda,
            data.energiaInjetadaHFP,
            data.autoConsumoHFP,
            data.saldoGeracaoHFP,
            data.energiaInjetadaHP,
            data.autoConsumoHP,
            data.saldoGeracaoHP,
        )
    }
}
