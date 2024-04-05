import FazendaEntity from "../../fazenda/fazenda.entity";
import FazendaFactory from "../../fazenda/fazenda.factory";
import FazendaStub from "../../../../stubs/fazenda.stub";
import fazendaStub from "../../../../stubs/fazenda.stub";
import ConcessionariaEntity from "../concessionaria.entity";

describe('FazendaEntity', () => {
    let fazenda: FazendaEntity;

    beforeEach(() => {
        fazenda = FazendaFactory.criarComId(FazendaStub);
    });

    it("deve instanciar uma fazenda", () => {
        expect(fazenda).toBeInstanceOf(FazendaEntity);
    });

    it("deve retornar o id da fazenda", () => {
        expect(fazenda.getId).toBe(fazendaStub.id);
    });

    it("deve retornar o nome da fazenda", () => {
        expect(fazenda.getNome).toBe(fazendaStub.nome);
    })

    it("deve retornar a unidade geradora da fazenda", () => {
        expect(fazenda.getUnidadeGeradora).toBe(fazendaStub.unidadeGeradora);
    });


    /*
    numeroInstalacao
    numeroCliente
    notaServico
    potenciaInstalada
    dataConexao
    concessionaria
    tipoDesvioCota
    limiteDesvioCota
    fonteEnergia
     */

    it("deve retornar o numero de instalação da fazenda", () => {
        expect(fazenda.getNumeroInstalacao).toBe(fazendaStub.numeroInstalacao);
    });

    it("deve retornar o numero do cliente da fazenda", () => {
        expect(fazenda.getNumeroCliente).toBe(fazendaStub.numeroCliente);
    });

    it("deve retornar a nota de serviço da fazenda", () => {
        expect(fazenda.getNotaServico).toBe(fazendaStub.notaServico);
    });

    it("deve retornar a potencia instalada da fazenda", () => {
        expect(fazenda.getPotenciaInstalada).toBe(fazendaStub.potenciaInstalada);
    });

    it("deve retornar a data de conexão da fazenda", () => {
        expect(fazenda.getDataConexao).toBe(fazendaStub.dataConexao);
    });

    it("deve retornar a concessionaria da fazenda", () => {
        expect(fazenda.getConcessionaria).toBeInstanceOf(ConcessionariaEntity);
    });

    it("deve retornar o tipo de desvio de cota da fazenda", () => {
        expect(fazenda.getTipoDesvioCota).toBe(fazendaStub.tipoDesvioCota);
    });

    it("deve retornar o limite de desvio de cota da fazenda", () => {
        expect(fazenda.getLimiteDesvioCota).toBe(fazendaStub.limiteDesvioCota);
    });

    it("deve retornar a fonte de energia da fazenda", () => {
        expect(fazenda.getFonteEnergia).toBe(fazendaStub.fonteEnergia);
    });

    it("deve lançar uma exceção ao tentar instanciar uma fazenda sem nome", () => {
        expect(() => FazendaFactory.criarComId({...fazendaStub, nome: ''})).toThrow();
    });

    it("deve lançar uma exceção ao tentar instanciar uma fazenda sem unidade geradora", () => {
        expect(() => FazendaFactory.criarComId({...fazendaStub, unidadeGeradora: ''})).toThrow();
    });

    it("deve lançar uma exceção ao tentar instanciar uma fazenda sem numero de instalação", () => {
        expect(() => FazendaFactory.criarComId({...fazendaStub, numeroInstalacao: ''})).toThrow();
    });

    it("deve lançar uma exceção ao tentar instanciar uma fazenda sem numero de cliente", () => {
        expect(() => FazendaFactory.criarComId({...fazendaStub, numeroCliente: ''})).toThrow();
    });

    it("deve lançar uma exceção ao tentar instanciar uma fazenda sem nota de serviço", () => {
        expect(() => FazendaFactory.criarComId({...fazendaStub, notaServico: ''})).toThrow();
    });

    it("deve lançar uma exceção ao tentar instanciar uma fazenda sem potencia instalada", () => {
        expect(() => FazendaFactory.criarComId({...fazendaStub, potenciaInstalada: 0})).toThrow();
    });

    it("deve lançar uma exceção ao tentar instanciar uma fazenda sem data de conexão", () => {
        expect(() => FazendaFactory.criarComId({...fazendaStub, dataConexao: null})).toThrow();
    });

    it("deve lançar uma exceção ao tentar instanciar uma fazenda sem concessionaria", () => {
        expect(() => FazendaFactory.criarComId({...fazendaStub, concessionaria: null})).toThrow();
    });

    it("deve lançar uma exceção ao tentar instanciar uma fazenda sem tipo de desvio de cota", () => {
        expect(() => FazendaFactory.criarComId({...fazendaStub, tipoDesvioCota: ''})).toThrow();
    });

    it("deve lançar uma exceção ao tentar instanciar uma fazenda sem limite de desvio de cota", () => {
        expect(() => FazendaFactory.criarComId({...fazendaStub, limiteDesvioCota: 0})).toThrow();
    });

})