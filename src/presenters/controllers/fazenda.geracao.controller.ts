import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import InsertGeracaoUseCase from "../../application/usecase/fazenda.geracao/insert.geracao.usecase";
import ShowFazendaUsecase from "../../application/usecase/fazenda/show.fazenda.usecase";
import ShowGeracaoUseCase from "../../application/usecase/fazenda.geracao/show.geracao.usecase";
import UpdateGeracaoUseCase from "../../application/usecase/fazenda.geracao/update.geracao.usecase";
import DestroyGeracaoUseCase from "../../application/usecase/fazenda.geracao/destroy.geracao.usecase";
import ListGeracaoUseCase from "../../application/usecase/fazenda.geracao/list.geracao.usecase";

@injectable()
export default class FazendaGeracaoController {
  constructor(
    @inject("InsertGeracaoUseCase")
    private readonly insertGeracaoUseCase: InsertGeracaoUseCase,
    @inject("ShowFazendaUsecase")
    private readonly showFazendaUsecase: ShowFazendaUsecase,
    @inject("ShowGeracaoUseCase")
    private readonly showGeracaoUseCase: ShowGeracaoUseCase,
    @inject("UpdateGeracaoUseCase")
    private readonly updateGeracaoUseCase: UpdateGeracaoUseCase,
    @inject("DestroyGeracaoUseCase")
    private readonly destroyGeracaoUseCase: DestroyGeracaoUseCase,
    @inject("ListGeracaoUseCase")
    private readonly listGeracaoUseCase: ListGeracaoUseCase
  ) {}

  async insert(req: Request, res: Response) {
    const { body, params } = req;

    const { fazenda } = params;

    const fazendaResult = await this.showFazendaUsecase.execute(fazenda);

    try {
      const result = await this.insertGeracaoUseCase.execute({
        ...body,
        fazenda: fazendaResult,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async show(req: Request, res: Response) {
    const { params } = req;
    const { id } = params;

    try {
      const result = await this.showGeracaoUseCase.execute(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const { body, params } = req;
    const { id, fazenda } = params;

    const fazendaResult = await this.showFazendaUsecase.execute(fazenda);

    try {
      const result = await this.updateGeracaoUseCase.execute({
        ...body,
        id,
        fazenda: fazendaResult,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async destroy(req: Request, res: Response) {
    const { params } = req;
    const { id } = params;

    try {
      const result = await this.destroyGeracaoUseCase.execute(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response) {
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

    const result = await this.listGeracaoUseCase.execute({
      page: pagina,
      limit: limite,
      filter: filter as string,
      filterColumn: filterColumn as string,
      orderby: orderby as string,
      direction: direction as string,
    });

    res.status(200).json(result);
  }
}
