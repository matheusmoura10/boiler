import {inject, injectable} from "inversify";
import SaveConcessionariaUsecase from "../../application/usecase/concessionarias/save.concessionaria.usecase";
import {Request, Response} from 'express';
import UpdateConcessionariaUsecase from "../../application/usecase/concessionarias/update.concessionaria.usecase";
import DestroyConcessionariaUsecase from "../../application/usecase/concessionarias/destroy.concessionaria.usecase";
import ShowConcessionariaUsecase from "../../application/usecase/concessionarias/show.concessionaria.usecase";
import ListConcessionariaUsecase from "../../application/usecase/concessionarias/list.concessionaria.usecase";

@injectable()
export default class ConcessionariaController {
    constructor(
        @inject('ListConcessionariaUsecase') private readonly listConcessionariaUsecase: ListConcessionariaUsecase,
        @inject('SaveConcessionariaUsecase') private readonly saveConcessionariaUsecase: SaveConcessionariaUsecase,
        @inject('UpdateConcessionariaUsecase') private readonly updateConcessionariaUsecase: UpdateConcessionariaUsecase,
        @inject('DestroyConcessionariaUsecase') private readonly destroyConcessionariaUsecase: DestroyConcessionariaUsecase,
        @inject('ShowConcessionariaUsecase') private readonly showConcessionariaUsecase: ShowConcessionariaUsecase
    ) {

    }

    async listar(req: Request, res: Response,) {

        const {page = 1, limit = 10, filter = null, filterColumn = null, orderby = 'id', direction = 'ASC'} = req.query;

        const pagina = parseInt(page as string);
        const limite = parseInt(limit as string);

        const result = await this.listConcessionariaUsecase.execute({
            page: pagina,
            limit: limite,
            filter: filter as string,
            filterColumn: filterColumn as string,
            orderby: orderby as string,
            direction: direction as string
        });

        res.status(200).json(result);
    }

    async salvar(req: Request, res: Response) {
        const {nome, estado} = req.body;

        const result = await this.saveConcessionariaUsecase.execute({nome, estado});

        res.status(201).json(result);
    }

    async atualizar(req: Request, res: Response) {
        const {nome, estado} = req.body;

        const id = req.params.id as unknown as string;

        const result = await this.updateConcessionariaUsecase.execute({id, nome, estado});
        res.status(200).json(result);
    }

    async excluir(req: Request, res: Response) {
        const id = req.params.id as string;

        const result = await this.destroyConcessionariaUsecase.execute(id);
        res.status(200).json(result);
    }

    async buscarPorId(req: Request, res: Response) {
        const id = req.params.id as string;

        const result = await this.showConcessionariaUsecase.execute(id);
        res.status(200).json(result);
    }

}