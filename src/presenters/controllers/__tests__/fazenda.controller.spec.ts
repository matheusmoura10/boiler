import "reflect-metadata";
import FazendaController from "../fazenda.controller";
import ListFazendaUsecase from "../../../application/usecase/fazenda/list.fazenda.usecase";
import ShowFazendaUsecase from "../../../application/usecase/fazenda/show.fazenda.usecase";
import DestroyFazendaUsecase from "../../../application/usecase/fazenda/destroy.fazenda.usecase";
import UpdateFazendaUsecase from "../../../application/usecase/fazenda/update.fazenda.usecase";
import { Request, Response } from "express";
import InsertFazendaUsecase from "../../../application/usecase/fazenda/insert.fazenda.usecase";
import { anything, instance, mock, reset, when } from "ts-mockito";
import FazendaFactory, {
  FazendaProps,
} from "../../../domain/fazenda/fazenda.factory";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { randomUUID } from "node:crypto";
import OutputListaPaginada from "../../../@shared/dto/output/OutputListaPaginada";
import FazendaEntity from "../../../domain/fazenda/fazenda.entity";
import ShowConcessionariaUsecase from "../../../application/usecase/concessionarias/show.concessionaria.usecase";
import ConcessionariaEntity from "../../../domain/concessionaria/concessionaria.entity";

describe("FazendaController", () => {
  let controller: FazendaController;
  let listarFazendaUseCase: ListFazendaUsecase;
  let showFazendaUseCase: ShowFazendaUsecase;
  let destroyFazendaUsecase: DestroyFazendaUsecase;
  let updateFazendaUsecase: UpdateFazendaUsecase;
  let inserirFazendaUsecase: InsertFazendaUsecase;
  let showConcessionariaUsecase: ShowConcessionariaUsecase;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    listarFazendaUseCase = mock(ListFazendaUsecase);
    showFazendaUseCase = mock(ShowFazendaUsecase);
    destroyFazendaUsecase = mock(DestroyFazendaUsecase);
    updateFazendaUsecase = mock(UpdateFazendaUsecase);
    inserirFazendaUsecase = mock(InsertFazendaUsecase);
    showConcessionariaUsecase = mock(ShowConcessionariaUsecase);
    req = {} as Request;
    res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    controller = new FazendaController(
      instance(listarFazendaUseCase),
      instance(inserirFazendaUsecase),
      instance(updateFazendaUsecase),
      instance(destroyFazendaUsecase),
      instance(showFazendaUseCase),
      instance(showConcessionariaUsecase)
    );
  });

  afterEach(() => {
    reset(listarFazendaUseCase);
    reset(inserirFazendaUsecase);
    reset(updateFazendaUsecase);
    reset(destroyFazendaUsecase);
    reset(showFazendaUseCase);
  });

  it("deve salvar uma fazenda", async () => {
    const data: FazendaProps = {
      nome: faker.person.firstName(),
      concessionaria: {
        id: faker.string.uuid(),
        nome: faker.company.name(),
        estado: faker.location.state(),
      },
      dataConexao: faker.date.recent(),
      fonteEnergia: faker.lorem.word(),
      limiteDesvioCota: faker.number.float(),
      notaServico: faker.lorem.sentence(),
      numeroCliente: faker.finance.accountNumber(10),
      numeroInstalacao: faker.finance.accountNumber(10),
      potenciaInstalada: faker.number.float(),
      tipoDesvioCota: faker.lorem.word(),
      unidadeGeradora: faker.lorem.word(),
    };

    const FazendaEntity = FazendaFactory.criar(data);
    when(inserirFazendaUsecase.execute(anything())).thenResolve(FazendaEntity);

    req.params = { concessionaria: faker.string.uuid() };
    req.body = data;
    await controller.salvar(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(FazendaEntity);
  });

  it("deve atualizar uma fazenda", async () => {
    const data = {
      nome: faker.person.firstName(),
      concessionaria: {
        id: faker.string.uuid(),
        nome: faker.company.name(),
        estado: faker.location.state(),
      },
      dataConexao: faker.date.recent(),
      fonteEnergia: faker.lorem.word(),
      limiteDesvioCota: faker.number.float(),
      notaServico: faker.lorem.sentence(),
      numeroCliente: faker.finance.accountNumber(10),
      numeroInstalacao: faker.finance.accountNumber(10),
      potenciaInstalada: faker.number.float(),
      tipoDesvioCota: faker.lorem.word(),
      unidadeGeradora: faker.lorem.word(),
    };

    when(showConcessionariaUsecase.execute(anything())).thenResolve(
      {} as ConcessionariaEntity
    );

    const FazendaEntity = FazendaFactory.criar(data);
    when(updateFazendaUsecase.execute(anything())).thenResolve(FazendaEntity);

    req.params = { id: faker.string.uuid() };
    req.body = data;
    await controller.atualizar(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(FazendaEntity);
  });

  it("deve excluir uma fazenda", async () => {
    when(destroyFazendaUsecase.execute(anything())).thenResolve({
      success: true,
      message: "Fazenda excluída com sucesso",
    });

    req.params = { id: faker.string.uuid() };
    await controller.excluir(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("deve obter uma fazenda", async () => {
    const FazendaEntity = FazendaFactory.criar({
      nome: faker.person.firstName(),
      concessionaria: {
        id: faker.string.uuid(),
        nome: faker.company.name(),
        estado: faker.location.state(),
      },
      dataConexao: faker.date.recent(),
      fonteEnergia: faker.lorem.word(),
      limiteDesvioCota: faker.number.float(),
      notaServico: faker.lorem.sentence(),
      numeroCliente: faker.finance.accountNumber(10),
      numeroInstalacao: faker.finance.accountNumber(10),
      potenciaInstalada: faker.number.float(),
      tipoDesvioCota: faker.lorem.word(),
      unidadeGeradora: faker.lorem.word(),
    });
    when(showFazendaUseCase.execute(anything())).thenResolve(FazendaEntity);

    req.params = { id: faker.string.uuid() };
    await controller.buscarPorId(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(FazendaEntity);
  });

  it("deve listar as fazendas", async () => {
    const expectedResult = {
      items: [
        {
          id: randomUUID(),
        },
      ],
      currentPage: 1,
      totalPages: 1,
      total: 2,
    } as unknown as OutputListaPaginada<FazendaEntity>;
    when(listarFazendaUseCase.execute(anything())).thenResolve(expectedResult);

    req.query = {
      page: "1",
      limit: "10",
      filter: null,
      filterColumn: null,
      orderby: "id",
      direction: "ASC",
    };

    await controller.listar(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResult);
  });
});
