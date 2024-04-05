import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";

export default class RequestInterceptor {
  intercept(req: Request, res: Response, next: NextFunction) {
    const ip = this.getIP(req);
    const method = req.method;
    const url = req.originalUrl;
    const body = req.body;
    const query = req.query;
    const params = req.params;
    const dataHora = new Date();

    logger.info(
      `Requisição recebida: ${method} ${url} - IP: ${ip} - Body: ${JSON.stringify(
        body
      )} - Query: ${JSON.stringify(query)} - Params: ${JSON.stringify(
        params
      )} as  ${dataHora.toLocaleDateString(
        "pt-BR"
      )} ${dataHora.toLocaleTimeString("pt-BR")} `
    );
    next();
  }

  private getIP(request: any): string {
    let ip: string;
    const ipAddr = request.headers["x-forwarded-for"];
    if (ipAddr) {
      const list = ipAddr.split(",");
      ip = list[list.length - 1];
    } else {
      ip = request.connection.remoteAddress;
    }
    return ip.replace("::ffff:", "");
  }
}

export const requestInterceptor = new RequestInterceptor();
