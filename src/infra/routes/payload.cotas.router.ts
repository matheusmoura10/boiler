import { Router } from "express";
import ExpressAdapter from "../adapter/framework/ExpressAdapter";
import container from "../IoC/container";
import PayloadCotasController from "../../presenters/controllers/payload.cotas.controller";
import uploads from "../file.reader/upload";
export const routerPayloadCotas = Router({
  mergeParams: true,
  strict: true,
  caseSensitive: true,
});

const adapter = new ExpressAdapter();
const controller = container.resolve(PayloadCotasController);

routerPayloadCotas.post(
  "/",
  uploads.single("file"),
  adapter.create(controller.cargaCotas.bind(controller))
);

export default routerPayloadCotas;
