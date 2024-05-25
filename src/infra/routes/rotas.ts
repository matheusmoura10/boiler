import { Router } from "express";
import { routerConcessionaria } from "./concessionaria.router";
import { routerFazenda } from "./fazenda.route";
import routerFazendaGeracao from "./fazenda.geracao.router";
import routerPayloadCotas from "./payload.cotas.router";
import { routerBalanco } from "./balanco.router";
export const rotas = Router({
  mergeParams: true,
  strict: true,
  caseSensitive: true,
});

rotas.use("/concessionaria", routerConcessionaria);
rotas.use("/concessionaria/:concessionaria/fazenda", routerFazenda);
rotas.use(
  "/concessionaria/:concessionaria/fazenda/:fazenda/geracao",
  routerFazendaGeracao
);
rotas.use("/cotas/payload", routerPayloadCotas);
rotas.use("/balanco", routerBalanco);

export default rotas;
