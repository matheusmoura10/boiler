import * as dotenv from "dotenv";
import CacheInterface from "../../@shared/cache/cache.interface";
import { createClient } from "redis";
import type { RedisClientType } from "redis";
import { logger } from "../logger/logger";

dotenv.config();

export default class RedisCache implements CacheInterface {
  private cliente: RedisClientType;

  constructor() {
    this.cliente = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    });

    this.cliente.connect();
    this.cliente.on("error", (err) => {
      logger.error(err);
    });
  }
  async set(key: string, value: any, expire?: number): Promise<void> {
    await this.cliente.set(key, JSON.stringify(value), {
      EX: expire ?? 60,
    }); // 1 hora
  }
  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cliente.get(key).then((data) => {
        if (!data) {
          reject("Chave não encontrada");
        }
        resolve(JSON.parse(data));
      });
    });
  }
  del(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cliente.del(key).then((data) => {
        if (!data) {
          reject("Chave não encontrada");
        }
        resolve();
      });
    });
  }
  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cliente.flushDb().then((data) => {
        if (!data) {
          reject("Erro ao limpar cache");
        }
        resolve();
      });
    });
  }

  getKeys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.cliente.keys("*").then((data) => {
        resolve(data);
      });
    });
  }

  isProvider(): string {
    return "redis";
  }
}
