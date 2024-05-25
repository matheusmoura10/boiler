import { DefaultJobOptions, Queue } from "bullmq";
import { redisOptionsConnect } from "../config/redis/config";

export default class CriarFila {
  nome: string;
  options?: DefaultJobOptions;
  queue: Queue;

  constructor(nomeFila: string, options?: DefaultJobOptions) {
    this.nome = nomeFila;
    this.options = options;

    this.queue = new Queue(this.nome, {
      connection: redisOptionsConnect,
      defaultJobOptions: this.options ?? {
        attempts: 1,
        delay: 0,
        removeOnComplete: {
          age: 20000, // 20 segundos
          count: 20000,
        },
        removeOnFail: {
          age: 1000 * 60 * 60 * 24, // 24 horas
        },
      },
    });
  }
}
