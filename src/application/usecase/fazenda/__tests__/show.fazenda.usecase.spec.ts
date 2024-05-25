import 'reflect-metadata';
import {anything, instance, mock, verify, when} from "ts-mockito";
import IFazendaRepository from "../../../../domain/fazenda/fazenda.repository";
import ShowFazendaUsecase from "../show.fazenda.usecase";
import FazendaFactory from "../../../../domain/fazenda/fazenda.factory";
import fazendaStub from "../../../../../stubs/fazenda.stub";

describe('ShowFazendaUseCase', () => {
    let usecase: ShowFazendaUsecase;
    let repositoryMock: IFazendaRepository;

    beforeEach(() => {
        repositoryMock = mock<IFazendaRepository>();
        usecase = new ShowFazendaUsecase(instance(repositoryMock));
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    it("deve retornar uma fazenda", async () => {
        const entity = FazendaFactory.criarComId(fazendaStub);
        const model = FazendaFactory.entityToModel(entity);

        when(repositoryMock.exists(fazendaStub.id)).thenResolve(true);
        when(repositoryMock.findOneByIdWithRelations(fazendaStub.id, anything())).thenResolve(model);

        const result = await usecase.execute(fazendaStub.id);

        expect(result).toEqual(entity);
        verify(repositoryMock.exists(fazendaStub.id)).called();
        verify(repositoryMock.findOneByIdWithRelations(fazendaStub.id, anything())).called();
        expect(result).toEqual(entity);
    });

    it("deve lançar exceção se a fazenda não existir", async () => {
        when(repositoryMock.exists(fazendaStub.id)).thenResolve(false);

        await expect(usecase.execute(fazendaStub.id)).rejects.toThrowError('Fazenda não encontrada');
        verify(repositoryMock.exists(fazendaStub.id)).called();
    })
});