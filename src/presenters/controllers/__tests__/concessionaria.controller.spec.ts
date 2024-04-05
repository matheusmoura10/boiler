import 'reflect-metadata';
import {anything, instance, mock, reset, when} from 'ts-mockito';

import {Request, Response} from 'express';
import ConcessionariaEntity from "../../../domain/concessionaria/concessionaria.entity";
import ListConcessionariaUsecase from "../../../application/usecase/concessionarias/list.concessionaria.usecase";
import ConcessionariaController from "../concessionaria.controller";
import ShowConcessionariaUsecase from "../../../application/usecase/concessionarias/show.concessionaria.usecase";
import DestroyConcessionariaUsecase from "../../../application/usecase/concessionarias/destroy.concessionaria.usecase";
import UpdateConcessionariaUsecase from "../../../application/usecase/concessionarias/update.concessionaria.usecase";
import SaveConcessionariaUsecase from "../../../application/usecase/concessionarias/save.concessionaria.usecase";
import {randomUUID} from "node:crypto";
import OutputListaPaginada from "../../../@shared/dto/output/OutputListaPaginada";

describe('ConcessionariaController', () => {
    let controller: ConcessionariaController;
    let listConcessionariaUsecase: ListConcessionariaUsecase;
    let saveConcessionariaUsecase: SaveConcessionariaUsecase;
    let updateConcessionariaUsecase: UpdateConcessionariaUsecase;
    let destroyConcessionariaUsecase: DestroyConcessionariaUsecase;
    let showConcessionariaUsecase: ShowConcessionariaUsecase;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        listConcessionariaUsecase = mock(ListConcessionariaUsecase);
        saveConcessionariaUsecase = mock(SaveConcessionariaUsecase);
        updateConcessionariaUsecase = mock(UpdateConcessionariaUsecase);
        destroyConcessionariaUsecase = mock(DestroyConcessionariaUsecase);
        showConcessionariaUsecase = mock(ShowConcessionariaUsecase);
        req = {} as Request;
        res = {} as Response;
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        controller = new ConcessionariaController(
            instance(listConcessionariaUsecase),
            instance(saveConcessionariaUsecase),
            instance(updateConcessionariaUsecase),
            instance(destroyConcessionariaUsecase),
            instance(showConcessionariaUsecase)
        );
    });

    afterEach(() => {
        reset(listConcessionariaUsecase);
        reset(saveConcessionariaUsecase);
        reset(updateConcessionariaUsecase);
        reset(destroyConcessionariaUsecase);
        reset(showConcessionariaUsecase);
    });

    it('deve salvar uma concessionária', async () => {
        const expectedResult = {id: 1, nome: 'Concessionaria A', estado: 'SP'} as unknown as ConcessionariaEntity;
        when(saveConcessionariaUsecase.execute(anything())).thenResolve(expectedResult);

        req.body = {nome: 'Concessionaria A', estado: 'SP'};

        await controller.salvar(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    it('deve atualizar uma concessionária', async () => {
        const expectedResult = {
            id: randomUUID(),
            nome: 'Concessionaria B',
            estado: 'SP'
        } as unknown as ConcessionariaEntity;
        when(updateConcessionariaUsecase.execute(anything())).thenResolve(expectedResult);

        req.body = {nome: 'Concessionaria B', estado: 'SP'};
        req.params = {id: expectedResult.getId};

        await controller.atualizar(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    it('deve excluir uma concessionária', async () => {
        const idConcessionaria = '123';
        const expectedResult = {message: 'Concessionária excluída com sucesso', success: true};
        when(destroyConcessionariaUsecase.execute(idConcessionaria)).thenResolve(expectedResult);

        req.params = {id: idConcessionaria};

        await controller.excluir(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    it('deve buscar uma concessionária por id', async () => {
        const idConcessionaria = '123';
        const expectedResult = {
            id: idConcessionaria,
            nome: 'Concessionaria A',
            estado: 'SP'
        } as unknown as ConcessionariaEntity;
        when(showConcessionariaUsecase.execute(idConcessionaria)).thenResolve(expectedResult);

        req.params = {id: idConcessionaria};

        await controller.buscarPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

    it('deve listar as concessionárias', async () => {
        const expectedResult = {
            items: [
                {
                    id: randomUUID(),
                    nome: 'Concessionaria A',
                    estado: 'SP'
                },
                {
                    id: randomUUID(),
                    nome: 'Concessionaria B',
                    estado: 'SP'
                }
            ],
            currentPage: 1,
            totalPages: 1,
            total: 2
        } as unknown as OutputListaPaginada<ConcessionariaEntity>
        when(listConcessionariaUsecase.execute(anything())).thenResolve(expectedResult);

        req.query = {page: "1", limit: "10", filter: null, filterColumn: null, orderby: 'id', direction: 'ASC'};

        await controller.listar(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResult);
    });

});