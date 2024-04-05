import {Router} from 'express';
import {routerConcessionaria} from "./concessionaria.router";
import {routerFazenda} from "./fazenda.route";


export const rotas = Router();

rotas.use('/concessionaria', routerConcessionaria);
rotas.use('/fazenda', routerFazenda);

export default rotas;