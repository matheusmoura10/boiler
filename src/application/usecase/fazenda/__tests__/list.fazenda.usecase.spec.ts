import 'reflect-metadata';
import {anything, instance, mock, when} from "ts-mockito";
import IFazendaRepository from "../../../../domain/fazenda/fazenda.repository";
import ListFazendaUsecase from "../list.fazenda.usecase";
import {InputListaPaginada} from "../../../../@shared/dto/input/input.dto";
import FazendaFactory from "../../../../domain/fazenda/fazenda.factory";
import FazendaStub from "../../../../../stubs/fazenda.stub";
import {FazendaModel} from "../../../../infra/data/models/fazenda.model";
import OutputListaPaginada from '../../../../@shared/dto/output/OutputListaPaginada';

describe('ListFazendaUseCase', () => {
    let usecase: ListFazendaUsecase;
    let repositoryMock: IFazendaRepository;

    beforeEach(() => {
        repositoryMock = mock<IFazendaRepository>();
        usecase = new ListFazendaUsecase(instance(repositoryMock));
    });

    it('should be defined', () => {
        expect(usecase).toBeDefined();
    });

    it("deve listar todas as fazendas", async () => {
        const listaPaginada: InputListaPaginada = {
            page: 1,
            limit: 10,
            orderby: 'nome',
            direction: 'ASC',
            filterColumn: 'nome',
            filter: ''
        }

        const items: FazendaModel[] = [];

        for (let i = 0; i < 10; i++) {
            const entity = FazendaFactory.criarComId(FazendaStub);
            const model = FazendaFactory.entityToModel(entity);
            items.push(model);
        }

        const ListFazendaPaginada: OutputListaPaginada<FazendaModel> = {
            items: items,
            total: 10,
            currentPage: 1,
            totalPages: 1
        }

        when(repositoryMock.paginate(anything(), anything())).thenResolve(ListFazendaPaginada);

        const result = await usecase.execute(listaPaginada);
        expect(result).toBeDefined();
        expect(result.items).toHaveLength(10);
    })

    it("deve lista fazendas vazias", async () => {
        const listaPaginada: InputListaPaginada = {
            page: 1,
            limit: 10,
            orderby: 'nome',
            direction: 'ASC',
            filterColumn: 'nome',
            filter: ''
        }

        const ListFazendaPaginada: OutputListaPaginada<FazendaModel> = {
            items: [],
            total: 0,
            currentPage: 1,
            totalPages: 0
        }

        when(repositoryMock.paginate(anything(), anything())).thenResolve(ListFazendaPaginada);

        const result = await usecase.execute(listaPaginada);
        expect(result).toBeDefined();
        expect(result.items).toHaveLength(0);
    })

})