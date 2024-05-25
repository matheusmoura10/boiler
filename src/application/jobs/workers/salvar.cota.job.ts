import { Job, Queue, QueueEvents, WorkerOptions } from "bullmq";
import { CriarWorker } from "../../../infra/queue/jobs";
import {
  CALCULAR_BALANCO_QUEUE,
  JobsEnum,
} from "../../../infra/queue/queue.config";
import container from "../../../infra/IoC/container";
import CotasRepository from "../../../infra/repository/cotas.repository";
import CotasEntity from "../../../domain/cotas/cotas.entity";
import CotasFactory from "../../../domain/cotas/cotas.factory";

async function handle(job: Job<CotasEntity>) {
  try {
    await job.updateProgress(0);

    const model = CotasFactory.toModelFromObject(job.data);

    await container.resolve(CotasRepository).atualizarOuInserir(model);

    await job.updateProgress(100);

    CALCULAR_BALANCO_QUEUE.queue.add("calcular-balanco", model);
  } catch (err) {
    throw new Error(err);
  }
}
const options = {
  concurrency: 2,
  useWorkerThreads: true,
  removeOnComplete: {
    age: 3600 / 3, // keep up to 20 minutes
  },
} as WorkerOptions;

export const SALVAR_COTAS_WORKER = new CriarWorker(
  JobsEnum.SALVAR_COTAS_QUEUE,
  handle,
  options
);
