import { Router } from "express";
import ExpressAdapter from "../adapter/framework/ExpressAdapter";
import container from "../IoC/container";
import FazendaGeracaoController from "../../presenters/controllers/fazenda.geracao.controller";
import ValidateSchema from "../../presenters/request/validation.schema";
import {
  geracaoPost,
  geracaoPut,
} from "../../presenters/request/geracao.request";
import { stringRequest } from "../../presenters/request/string.request";
import { validate } from "uuid";
import { listaPaginadaRequest } from "../../presenters/request/paginacao.request";

export const routerFazendaGeracao = Router({
  mergeParams: true,
  strict: true,
  caseSensitive: true,
});

const adapter = new ExpressAdapter();
const controller = container.resolve(FazendaGeracaoController);

routerFazendaGeracao.post(
  "/",
  ValidateSchema(geracaoPost),
  adapter.create(controller.insert.bind(controller))
);
routerFazendaGeracao.get(
  "/:id",
  ValidateSchema(stringRequest),
  adapter.create(controller.show.bind(controller))
);
routerFazendaGeracao.put(
  "/:id",
  ValidateSchema(geracaoPut),
  adapter.create(controller.update.bind(controller))
);
routerFazendaGeracao.delete(
  "/:id",
  ValidateSchema(stringRequest),
  adapter.create(controller.destroy.bind(controller))
);
routerFazendaGeracao.get(
  "/",
  ValidateSchema(listaPaginadaRequest),
  adapter.create(controller.list.bind(controller))
);

export default routerFazendaGeracao;
