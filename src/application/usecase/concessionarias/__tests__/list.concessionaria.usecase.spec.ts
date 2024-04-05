import 'reflect-metadata';
import IConcessionariaRepository from "../../../../domain/concessionaria/concessionaria.repository";
import {anything, instance, mock, when} from "ts-mockito";
import ListConcessionariaUsecase from "../list.concessionaria.usecase";
import {InputListaPaginada} from "../../../../@shared/dto/input/input.dto";
import {randomUUID} from "node:crypto";
import ConcessionariaFactory from "../../../../domain/concessionaria/concessionaria.factory";
import OutputListaPaginada from "../../../../@shared/dto/output/OutputListaPaginada";
import {ConcessionariaModel} from "../../../../infra/data/models/concessionaria.model";

describe('ListConcessionariaUseCase', () => {
    let usecase: ListConcessionariaUsecase;
    let repositoryMock: IConcessionariaRepository;

    beforeEach(() => {
        repositoryMock = mock<IConcessionariaRepository>();
        usecase = new ListConcessionariaUsecase(instance(repositoryMock));
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    it("deve listar todas as concessionárias", async () => {

        const query: InputListaPaginada = {
            page: 1,
            limit: 10,
            filter: "",
            direction: "ASC",
            filterColumn: "nome",
            orderby: "nome"
        }

        const concessionarias = []

        for (let i = 0; i < 10; i++) {
            concessionarias.push(ConcessionariaFactory.criarComId({
                id: randomUUID(),
                nome: "Concessionaria " + i,
                estado: "SP"
            }))
        }

        const OutputListaPaginada: OutputListaPaginada<ConcessionariaModel> = {
            items: concessionarias,
            totalPages: 1,
            total: 10,
            currentPage: 1
        }

        when(repositoryMock.paginate(anything())).thenResolve(OutputListaPaginada);

        const result = await usecase.execute(query);

        expect(result).toBeDefined();
        expect(result.items).toHaveLength(10);
        expect(result.total).toBe(10);
        expect(result.totalPages).toBe(1);
        expect(result.currentPage).toBe(1);
    });
})