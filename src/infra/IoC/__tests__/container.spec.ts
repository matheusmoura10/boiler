import 'reflect-metadata';
import {Container} from 'inversify';
import container from "../container";
import {ConcessionariaModel} from "../../data/models/concessionaria.model";
import UpdateConcessionariaUsecase from "../../../application/usecase/concessionarias/update.concessionaria.usecase";
import SaveConcessionariaUsecase from "../../../application/usecase/concessionarias/save.concessionaria.usecase";
import ConcessionariaRepository from "../../repository/concessionaria.repository";
import DestroyConcessionariaUsecase from "../../../application/usecase/concessionarias/destroy.concessionaria.usecase";
import ShowConcessionariaUsecase from "../../../application/usecase/concessionarias/show.concessionaria.usecase";
import ListConcessionariaUsecase from "../../../application/usecase/concessionarias/list.concessionaria.usecase";
import {FazendaModel} from "../../data/models/fazenda.model";
import FazendaRepository from "../../repository/fazenda.repository";
import InsertFazendaUsecase from "../../../application/usecase/fazenda/insert.fazenda.usecase";
import UpdateFazendaUsecase from "../../../application/usecase/fazenda/update.fazenda.usecase";
import ListFazendaUsecase from "../../../application/usecase/fazenda/list.fazenda.usecase";
import DestroyFazendaUsecase from "../../../application/usecase/fazenda/destroy.fazenda.usecase";
import ShowFazendaUsecase from "../../../application/usecase/fazenda/show.fazenda.usecase";


describe('Dependency Injection Container Tests', () => {
    let diContainer: Container;

    beforeEach(() => {
        diContainer = container;
    });

    it('deve resolver as dependências corretamente', () => {

        const concessionariaModel = diContainer.get<ConcessionariaModel>('ConcessionariaModel');
        expect(concessionariaModel).toBeInstanceOf(ConcessionariaModel);

        const concessionariaRepository = diContainer.get('ConcessionariaRepository');
        expect(concessionariaRepository).toBeInstanceOf(ConcessionariaRepository);

        const saveConcessionariaUsecase = diContainer.get('SaveConcessionariaUsecase');
        expect(saveConcessionariaUsecase).toBeInstanceOf(SaveConcessionariaUsecase);

        const updateConcessionariaUsecase = diContainer.get('UpdateConcessionariaUsecase');
        expect(updateConcessionariaUsecase).toBeInstanceOf(UpdateConcessionariaUsecase);

        const destroyConcessionariaUsecase = diContainer.get('DestroyConcessionariaUsecase');
        expect(destroyConcessionariaUsecase).toBeInstanceOf(DestroyConcessionariaUsecase);

        const showConcessionariaUsecase = diContainer.get('ShowConcessionariaUsecase');
        expect(showConcessionariaUsecase).toBeInstanceOf(ShowConcessionariaUsecase);

        const listConcessionariaUsecase = diContainer.get('ListConcessionariaUsecase');
        expect(listConcessionariaUsecase).toBeInstanceOf(ListConcessionariaUsecase);

        const fazendaModel = diContainer.get('FazendaModel');
        expect(fazendaModel).toBeInstanceOf(FazendaModel);

        const fazendaRepository = diContainer.get('FazendaRepository');
        expect(fazendaRepository).toBeInstanceOf(FazendaRepository);

        const insertFazendaUsecase = diContainer.get('InsertFazendaUsecase');
        expect(insertFazendaUsecase).toBeInstanceOf(InsertFazendaUsecase);

        const updateFazendaUsecase = diContainer.get('UpdateFazendaUsecase');
        expect(updateFazendaUsecase).toBeInstanceOf(UpdateFazendaUsecase);

        const destroyFazendaUsecase = diContainer.get('DestroyFazendaUsecase');
        expect(destroyFazendaUsecase).toBeInstanceOf(DestroyFazendaUsecase);

        const listFazendaUsecase = diContainer.get('ListFazendaUsecase');
        expect(listFazendaUsecase).toBeInstanceOf(ListFazendaUsecase);

        const showFazendaUsecase = diContainer.get('ShowFazendaUsecase');
        expect(showFazendaUsecase).toBeInstanceOf(ShowFazendaUsecase);
    });
});