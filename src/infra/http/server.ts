import "reflect-metadata";
import * as Express from "express";
import * as dotenv from "dotenv";
import rotas from "../routes/rotas";
import express, { Request, Response, NextFunction } from "express";
import connection from "../config/db/data-source";
import { HIGH, LOW, MEDIUM, monitor } from "../queue/queue.config";
import { worker1 } from "../../application/jobs/workers/worker1";
import { worker2 } from "../../application/jobs/workers/worker2";
import { logger } from "../logger/logger";
import { requestInterceptor } from "../interceptors/request.interceptor";
dotenv.config();

void (async () => {
  const app = Express();

  await connection.initialize();

  await monitor.init();

  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));
  app.use(requestInterceptor.intercept.bind(requestInterceptor));
  app.use("/api", rotas);
  app.use("/horizon", monitor.router);

  app.get("/", (req, res) => {
    return res.send("API rodando 🚀");
  });
  app.get("*", function (req, res) {
    res.status(404).send("Endpoint não encontrado");
    3755;
  });

  app.listen(process.env.APP_PORT, async () => {
    logger.info(`Server rodando na porta ${process.env.APP_PORT}`);
  });
})();
