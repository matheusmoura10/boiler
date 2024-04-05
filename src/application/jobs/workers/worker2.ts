import { Job, WorkerOptions } from "bullmq";
import { CriarWorker } from "../../../infra/queue/jobs";
import { JobsEnum } from "../../../infra/queue/queue.config";
import CacheService, { cacheService } from "../../../infra/cache/cache.service";

// Defina a função que será executada pelo worker
async function handle(job: Job) {
}

// Defina as opções do worker, se necessário
const options = {
  concurrency: 5,
  useWorkerThreads: true,
} as WorkerOptions;

// Crie uma instância da classe criarWorker, passando o nome do worker, a função e as opções
export const worker2 = new CriarWorker(JobsEnum.LOW, handle, options);
