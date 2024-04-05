import {BaseEntity} from "../base.entity";

export class ClienteStub extends BaseEntity {
    private nome: string;

    constructor(id: string, nome: string) {
        super(id);
        this.nome = nome;
    }

    validar() {
    }
}

export class OrdemStub extends BaseEntity {
    private cliente: ClienteStub;
    private valor: number;

    constructor(id: string, cliente: ClienteStub, valor: number) {
        super(id);
        this.cliente = cliente;
        this.valor = valor;
    }

    validar() {
    }
}

describe('BaseEntity', () => {

    it('deve retornar um objeto com os valores corretos', () => {
        const cliente = new ClienteStub('1', 'Cliente 1');
        const ordem = new OrdemStub('2', cliente, 100);

        const array = ordem.toArray();

        expect(array).toEqual({
            id: '2',
            cliente: {
                id: '1',
                nome: 'Cliente 1'
            },
            valor: 100
        });

    })
});