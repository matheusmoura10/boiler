import { Router } from "express";
import ExpressAdapter from "../adapter/framework/ExpressAdapter";
import container from "../IoC/container";
import ConcessionariaController from "../../presenters/controllers/concessionaria.controller";
import ValidateSchema from "../../presenters/request/validation.schema";
import {
  concessionariaPost,
  concessionariaPut,
} from "../../presenters/request/concessionaria.request";
import { listaPaginadaRequest } from "../../presenters/request/paginacao.request";
import { stringRequest } from "../../presenters/request/string.request";

export const routerConcessionaria = Router({
  mergeParams: true,
  strict: true,
  caseSensitive: true,
});

const adapter = new ExpressAdapter();
const controller = container.resolve(ConcessionariaController);

routerConcessionaria.get(
  "/",
  ValidateSchema(listaPaginadaRequest),
  adapter.create(controller.listar.bind(controller))
);
routerConcessionaria.post(
  "/",
  ValidateSchema(concessionariaPost),
  adapter.create(controller.salvar.bind(controller))
);
routerConcessionaria.put(
  "/:id",
  ValidateSchema(concessionariaPut),
  adapter.create(controller.atualizar.bind(controller))
);
routerConcessionaria.delete(
  "/:id",
  ValidateSchema(stringRequest),
  adapter.create(controller.excluir.bind(controller))
);
routerConcessionaria.get(
  "/:id",
  ValidateSchema(stringRequest),
  adapter.create(controller.buscarPorId.bind(controller))
);
