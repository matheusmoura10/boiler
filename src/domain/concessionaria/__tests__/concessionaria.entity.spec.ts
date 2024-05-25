import ConcessionariaEntity from "../concessionaria.entity";
import DomainException from "../../../@shared/exceptions/domain.exception";

describe('ConcessionariaEntity', () => {
    let concessionaria: ConcessionariaEntity;

    beforeEach(() => {
        concessionaria = new ConcessionariaEntity('test-id', 'Concessionaria Teste', 'Teste Estado');
    });

    it("deve instanciar uma concessionaria", () => {
        expect(concessionaria).toBeInstanceOf(ConcessionariaEntity);
    });

    it("deve retornar o id da concessionaria", () => {
        expect(concessionaria.getId).toBe('test-id');
    });

    it("deve retornar o nome da concessionaria", () => {
        expect(concessionaria.getNome).toBe('Concessionaria Teste');
    });

    it("deve retornar o estado da concessionaria", () => {
        expect(concessionaria.getEstado).toBe('Teste Estado');
    });

    it("deve lançar uma exceção ao tentar instanciar uma concessionaria sem nome", () => {
        expect(() => new ConcessionariaEntity('test-id', '', 'Teste Estado')).toThrow();
        expect(() => new ConcessionariaEntity('test-id', '', 'Teste Estado')).toThrowError('Erro a montar o dominio:ConcessionariaEntity');
        expect(() => new ConcessionariaEntity('test-id', '', 'Teste Estado')).toThrowError(DomainException);
    });

    it("deve lançar uma exceção ao tentar instanciar uma concessionaria sem estado", () => {
        expect(() => new ConcessionariaEntity('test-id', 'Concessionaria Teste', '')).toThrow();
        expect(() => new ConcessionariaEntity('test-id', 'Concessionaria Teste', '')).toThrowError('Erro a montar o dominio:ConcessionariaEntity');
        expect(() => new ConcessionariaEntity('test-id', 'Concessionaria Teste', '')).toThrowError(DomainException);
    });


});