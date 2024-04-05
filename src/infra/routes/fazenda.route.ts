import {Router} from 'express';
import ExpressAdapter from "../adapter/framework/ExpressAdapter";
import container from "../IoC/container";
import FazendaController from "../../presenters/controllers/fazenda.controller";
import ValidateSchema from "../../presenters/request/validation.schema";
import {stringRequest} from "../../presenters/request/string.request";
import {listaPaginadaRequest} from "../../presenters/request/paginacao.request";
import {fazendaPost, fazendaPut} from "../../presenters/request/fazenda.request";


export const routerFazenda = Router();

const adapter = new ExpressAdapter();
const controller = container.resolve(FazendaController);

routerFazenda.get('/', ValidateSchema(listaPaginadaRequest), adapter.create(controller.listar.bind(controller)));
routerFazenda.post('/', ValidateSchema(fazendaPost), adapter.create(controller.salvar.bind(controller)));
routerFazenda.put('/:id', ValidateSchema(fazendaPut), adapter.create(controller.atualizar.bind(controller)));
routerFazenda.delete('/:id', ValidateSchema(stringRequest), adapter.create(controller.excluir.bind(controller)));
routerFazenda.get('/:id', ValidateSchema(stringRequest), adapter.create(controller.buscarPorId.bind(controller)));