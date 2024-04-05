import 'reflect-metadata';
import {instance, mock, when} from "ts-mockito";
import IFazendaRepository from "../../../../domain/fazenda/fazenda.repository";
import DestroyFazendaUsecase from "../destroy.fazenda.usecase";

describe("InsertFazendaUseCase", () => {

    let usecase: DestroyFazendaUsecase;
    let repositoryMock: IFazendaRepository;

    beforeEach(() => {
        repositoryMock = mock<IFazendaRepository>();
        usecase = new DestroyFazendaUsecase(instance(repositoryMock));
    });

    it("deve deletar uma fazenda", async () => {
        const id = '123';
        when(repositoryMock.delete(id)).thenResolve();
        const result = await usecase.execute(id);

        expect(result).toEqual({
            success: true, message: 'Fazenda excluída com sucesso'
        });
    });

});