import {anything, instance, mock, verify, when} from "ts-mockito";
import UpdateFazendaUsecase from "../update.fazenda.usecase";
import IFazendaRepository from "../../../../domain/fazenda/fazenda.repository";
import FazendaFactory from "../../../../domain/fazenda/fazenda.factory";
import fazendaStub from "../../../../../stubs/fazenda.stub";

describe('UpdateFazendaUsecase', () => {
    let usecase: UpdateFazendaUsecase;
    let repositoryMock: IFazendaRepository;

    beforeEach(() => {
        repositoryMock = mock<IFazendaRepository>();
        usecase = new UpdateFazendaUsecase(instance(repositoryMock));
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    it("deve atualizar uma fazenda", async () => {


        const entity = FazendaFactory.criarComId(fazendaStub);
        const model = FazendaFactory.entityToModel(entity);

        when(repositoryMock.exists(fazendaStub.id)).thenResolve(true);
        when(repositoryMock.findOneById(fazendaStub.id)).thenResolve(model);
        when(repositoryMock.update(anything())).thenResolve(model);

        const result = await usecase.execute(fazendaStub);

        expect(result).toBeDefined();
        verify(repositoryMock.exists(fazendaStub.id)).called();
        verify(repositoryMock.update(anything())).called();
    })

    it("deve lançar exceção se a fazenda não existir", async () => {


        when(repositoryMock.exists(fazendaStub.id)).thenResolve(false);

        await expect(usecase.execute(fazendaStub)).rejects.toThrowError('Fazenda não encontrada');
        verify(repositoryMock.exists(fazendaStub.id)).called();
    })
});