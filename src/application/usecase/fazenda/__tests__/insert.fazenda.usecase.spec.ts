import FazendaFactory from "../../../../domain/fazenda/fazenda.factory";
import fazendaStub from "../../../../../stubs/fazenda.stub";
import {anything, instance, mock, when} from "ts-mockito";
import IFazendaRepository from "../../../../domain/fazenda/fazenda.repository";
import InsertFazendaUsecase from "../insert.fazenda.usecase";

describe("InsertFazendaUseCase", () => {

    let usecase: InsertFazendaUsecase;
    let repositoryMock: IFazendaRepository;

    beforeEach(() => {
        repositoryMock = mock<IFazendaRepository>();
        usecase = new InsertFazendaUsecase(instance(repositoryMock));
    });

    it("deve inserir uma fazenda", async () => {

        const entity = FazendaFactory.criar(fazendaStub);
        const model = FazendaFactory.entityToModel(entity);

        when(repositoryMock.create(anything())).thenResolve(model);

        const result = await usecase.execute(fazendaStub);

        expect(result).toBeDefined();
    })
});