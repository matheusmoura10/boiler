import "reflect-metadata";
import IConcessionariaRepository from "../../../../domain/concessionaria/concessionaria.repository";
import {instance, mock, when} from "ts-mockito";
import ShowConcessionariaUsecase from "../show.concessionaria.usecase";
import {AtualizarConcessionariaInput} from "../dto/input";
import {randomUUID} from "node:crypto";
import ConcessionariaFactory from "../../../../domain/concessionaria/concessionaria.factory";

describe('ShowConcessionariaUseCase', () => {
    let usecase: ShowConcessionariaUsecase;
    let repositoryMock: IConcessionariaRepository;

    beforeEach(() => {
        repositoryMock = mock<IConcessionariaRepository>();
        usecase = new ShowConcessionariaUsecase(instance(repositoryMock));
    });

    it("deve retornar uma concessionaria", async () => {
        const id = '123';
        const input: AtualizarConcessionariaInput = {
            id: randomUUID(),
            nome: 'Concessionaria 1',
            estado: 'SP'
        }

        const entity = ConcessionariaFactory.criarComId(input);
        const model = ConcessionariaFactory.entityToModel(entity);

        when(repositoryMock.findOneById(id)).thenResolve(model);

        const result = await usecase.execute(id);

        expect(result).toEqual(entity);
    });

    it("deve lançar uma exceção caso a concessionaria não exista", async () => {
        const id = '123';

        when(repositoryMock.findOneById(id)).thenResolve(null);

        try {
            await usecase.execute(id);
        } catch (e) {
            expect(e.message).toEqual('Concessionária não encontrada');
        }
    });
})