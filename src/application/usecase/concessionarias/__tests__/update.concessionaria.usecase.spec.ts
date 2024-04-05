import "reflect-metadata";
import IConcessionariaRepository from "../../../../domain/concessionaria/concessionaria.repository";
import UpdateConcessionariaUsecase from "../update.concessionaria.usecase";
import {anything, instance, mock, when} from "ts-mockito";
import {AtualizarConcessionariaInput} from "../dto/input";
import ConcessionariaFactory from "../../../../domain/concessionaria/concessionaria.factory";
import {randomUUID} from "node:crypto";

describe('AtualizarConcessionariaUsecase', () => {
    let usecase: UpdateConcessionariaUsecase;
    let repositoryMock: IConcessionariaRepository;

    beforeEach(() => {
        repositoryMock = mock<IConcessionariaRepository>();
        usecase = new UpdateConcessionariaUsecase(instance(repositoryMock));
    });

    it('deve atualizar uma concessionaria', async () => {
        const input: AtualizarConcessionariaInput = {
            id: randomUUID(),
            nome: 'Concessionaria 1',
            estado: 'SP'
        }

        const entity = ConcessionariaFactory.criarComId(input);
        const model = ConcessionariaFactory.entityToModel(entity);

        when(repositoryMock.findOneById(anything())).thenResolve(model);
        when(repositoryMock.update(anything())).thenResolve(model);

        const result = await usecase.execute(input);

        expect(result).toEqual(entity);
        expect(result.getId).toEqual(input.id);
        expect(result.getNome).toEqual(input.nome);
        expect(result.getEstado).toEqual(input.estado);
    })

    it("deve lançar uma exceção caso a concessionaria não exista", async () => {
        const input: AtualizarConcessionariaInput = {
            id: randomUUID(),
            nome: 'Concessionaria 1',
            estado: 'SP'
        }

        when(repositoryMock.findOneById(anything())).thenResolve(null);

        try {
            await usecase.execute(input);
        } catch (e) {
            expect(e.message).toEqual('Concessionária não encontrada');
        }
    });
});