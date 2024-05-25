import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import InsertFazendaUsecase from "../../application/usecase/fazenda/insert.fazenda.usecase";
import UpdateFazendaUsecase from "../../application/usecase/fazenda/update.fazenda.usecase";
import DestroyFazendaUsecase from "../../application/usecase/fazenda/destroy.fazenda.usecase";
import ShowFazendaUsecase from "../../application/usecase/fazenda/show.fazenda.usecase";
import ListFazendaUsecase from "../../application/usecase/fazenda/list.fazenda.usecase";
import {
  FazendaProps,
  FazendaPropsId,
} from "../../domain/fazenda/fazenda.factory";
import ShowConcessionariaUsecase from "../../application/usecase/concessionarias/show.concessionaria.usecase";

@injectable()
export default class FazendaController {
  constructor(
    @inject("ListFazendaUsecase")
    private readonly listFazendaUsecase: ListFazendaUsecase,
    @inject("InsertFazendaUsecase")
    private readonly insertFazendaUsecase: InsertFazendaUsecase,
    @inject("UpdateFazendaUsecase")
    private readonly updateFazendaUsecase: UpdateFazendaUsecase,
    @inject("DestroyFazendaUsecase")
    private readonly destroyFazendaUsecase: DestroyFazendaUsecase,
    @inject("ShowFazendaUsecase")
    private readonly showFazendaUsecase: ShowFazendaUsecase,
    @inject("ShowConcessionariaUsecase")
    private readonly showConcessionariaUsecase: ShowConcessionariaUsecase
  ) {}

  async listar(req: Request, res: Response) {
    const {
      page = 1,
      limit = 10,
      filter = "",
      filterColumn = "",
      orderby = "id",
      direction = "ASC",
    } = req.query;

    const pagina = parseInt(page as string);
    const limite = parseInt(limit as string);

    const result = await this.listFazendaUsecase.execute({
      page: pagina,
      limit: limite,
      filter: filter as string,
      filterColumn: filterColumn as string,
      orderby: orderby as string,
      direction: direction as string,
    });

    res.status(200).json(result);
  }

  async salvar(req: Request, res: Response) {
    const data = req.body as FazendaProps;
    const concessionariaId = req.params.concessionaria as unknown as string;

    const concessionaria = await this.showConcessionariaUsecase.execute(
      concessionariaId
    );

    const resultado = await this.insertFazendaUsecase.execute({
      concessionaria,
      ...data,
    });

    res.status(201).json(resultado);
  }

  async atualizar(req: Request, res: Response) {
    const data = req.body as FazendaPropsId;
    const { id, concessionaria } = req.params;

    const concessionariaResult = await this.showConcessionariaUsecase.execute(
      concessionaria
    );

    const result = await this.updateFazendaUsecase.execute({
      id,
      concessionaria: concessionariaResult,
      ...data,
    });

    res.status(200).json(result);
  }

  async excluir(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.destroyFazendaUsecase.execute(id);
    res.status(200).json(result);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = req.params.id as unknown as string;

    const result = await this.showFazendaUsecase.execute(id);
    res.status(200).json(result);
  }
}
