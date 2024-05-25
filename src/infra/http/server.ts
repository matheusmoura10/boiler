import "reflect-metadata";
import * as Express from "express";
import * as dotenv from "dotenv";
import rotas from "../routes/rotas";
import connection from "../config/db/data-source";
import {
  CALCULAR_BALANCO_QUEUE,
  SALVAR_COTAS_QUEUE,
  monitor,
  obterProgressoQueue,
} from "../queue/queue.config";
import { logger } from "../logger/logger";
import { requestInterceptor } from "../interceptors/request.interceptor";
import { SALVAR_COTAS_WORKER } from "../../application/jobs/workers/salvar.cota.job";
import { CALCULAR_BALANCO_WORKER } from "../../application/jobs/workers/calcular.balanco.job";
dotenv.config();

void (async () => {
  const app = Express();

  await connection.initialize();

  await monitor.init();
  app.use("/horizon", monitor.router);
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));
  app.use(requestInterceptor.intercept.bind(requestInterceptor));
  app.use("/api", rotas);

  app.get("/", (req, res) => {
    return res.send("API rodando 🚀");
  });

  app.get("*", function (req, res) {
    res.status(404).send("Endpoint não encontrado");
  });

  app.listen(process.env.APP_PORT, async () => {
    console.log(`Server rodando na porta ${process.env.APP_PORT}`);
    console.log("-".repeat(80) + "\n");

    //SALVAR_COTAS_QUEUE.queue.obliterate();
    //CALCULAR_BALANCO_QUEUE.queue.obliterate();
    SALVAR_COTAS_WORKER;
    CALCULAR_BALANCO_WORKER;
  });
})();
