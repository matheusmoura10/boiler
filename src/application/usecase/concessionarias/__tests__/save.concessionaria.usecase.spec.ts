import 'reflect-metadata';
import IConcessionariaRepository from "../../../../domain/concessionaria/concessionaria.repository";
import {anything, instance, mock, when} from "ts-mockito";
import SaveConcessionariaUsecase from "../save.concessionaria.usecase";
import ConcessionariaFactory from "../../../../domain/concessionaria/concessionaria.factory";
import {randomUUID} from "node:crypto";

describe('SaveConcessionariaUseCase', () => {
    let usecase: SaveConcessionariaUsecase;
    let repositoryMock: IConcessionariaRepository;

    beforeEach(() => {
        repositoryMock = mock<IConcessionariaRepository>();
        usecase = new SaveConcessionariaUsecase(instance(repositoryMock));
    });

    it("deve salvar uma concessionaria", async () => {
        const input = {
            nome: 'Concessionaria 1',
            estado: 'SP'
        }

        const entity = ConcessionariaFactory.criar(input);
        const model = ConcessionariaFactory.entityToModel(entity);

        when(repositoryMock.create(anything())).thenResolve(
            model
        );

        const result = await usecase.execute(input);

        expect(result).toEqual({
            id: randomUUID(),
            ...model
        });
    });
})