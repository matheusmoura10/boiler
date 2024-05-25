import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";

export default class RequestInterceptor {
  intercept(req: Request, res: Response, next: NextFunction) {
    const ip = this.getIP(req);
    const { method, originalUrl: url, body, query, params } = req;
    const dataHora = new Date();

    logger.info(
      `Requisição recebida: ${method} ${url} - IP: ${ip} - Body: ${JSON.stringify(
        body
      )} - Query: ${JSON.stringify(query)} - Params: ${JSON.stringify(
        params
      )} as ${dataHora.toLocaleDateString(
        "pt-BR"
      )} ${dataHora.toLocaleTimeString("pt-BR")}`
    );
    next();
  }

  private getIP(request: Request): string {
    const ipAddr =
      request.headers["x-forwarded-for"]?.toString().split(",").pop() ||
      request.connection.remoteAddress;
    return ipAddr.replace("::ffff:", "");
  }
}

export const requestInterceptor = new RequestInterceptor();
