import { Job, Worker, WorkerOptions, QueueEvents } from "bullmq";
import { redisOptionsConnect } from "../config/redis/config";

export class CriarWorker<T = any> {
  private nome: string;
  private funcao: (job: Job<T>) => Promise<void>;
  private options?: WorkerOptions;

  constructor(
    nomeWorker: string,
    funcao: (job: Job<T>) => Promise<void>,
    options?: WorkerOptions
  ) {
    this.nome = nomeWorker;
    this.funcao = funcao;
    this.options = options;

    const worker = new Worker(this.nome, this.funcao, {
      connection: redisOptionsConnect,
      ...this.options,
    });

    worker.on("completed", (job) => {
      console.log(
        `Job id: ${job.id} finalizado com sucesso! na fila ${this.nome} 🤌`
      );
    });

    worker.on("failed", (job) => {
      console.log(`Job id: ${job.id} falhou na queue: ${this.nome} ⛔`);
    });

    worker.on("ready", () => {
      console.log(`Worker conectado - ${this.nome} 🚀`);
    });
  }
}
