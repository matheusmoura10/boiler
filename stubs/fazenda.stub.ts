import {FazendaPropsId} from "../src/domain/fazenda/fazenda.factory";
import {randomUUID} from "node:crypto";
import {fakerPT_BR} from "@faker-js/faker";

const fazendaStub: FazendaPropsId = {
    id: randomUUID(),
    nome: fakerPT_BR.person.firstName(),
    unidadeGeradora: fakerPT_BR.lorem.word(),
    tipoDesvioCota: fakerPT_BR.lorem.word(),
    notaServico: fakerPT_BR.lorem.word(),
    fonteEnergia: fakerPT_BR.lorem.word(),
    dataConexao: new Date(),
    concessionaria: {
        id: randomUUID(),
        nome: fakerPT_BR.company.name(),
        estado: fakerPT_BR.location.state()
    },
    limiteDesvioCota: fakerPT_BR.number.int(),
    numeroCliente: fakerPT_BR.lorem.word(),
    numeroInstalacao: fakerPT_BR.lorem.word(),
    potenciaInstalada: fakerPT_BR.number.int()
}

export default fazendaStub;