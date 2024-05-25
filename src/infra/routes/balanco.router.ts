import { Router } from "express";
import ExpressAdapter from "../adapter/framework/ExpressAdapter";
import container from "../IoC/container";
import BalancoController from "../../presenters/controllers/balanco.controller";

export const routerBalanco = Router({
  mergeParams: true,
  strict: true,
  caseSensitive: true,
});

const adapter = new ExpressAdapter();
const controller = container.resolve(BalancoController);

routerBalanco.post(
  "/",
  adapter.create(controller.calcularBalanco.bind(controller))
);
