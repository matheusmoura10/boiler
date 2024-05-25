import { Job, Queue, QueueEvents, WorkerOptions } from "bullmq";
import { CriarWorker } from "../../../infra/queue/jobs";
import { JobsEnum } from "../../../infra/queue/queue.config";
import container from "../../../infra/IoC/container";
import CalcularBalancoUseCase from "../../usecase/balanco/calcular.balanco.usecase";
import * as moment from "moment";

// Defina a função que será executada pelo worker
async function handle(job: Job<any>) {
  await job.updateProgress(0);

  await container.resolve(CalcularBalancoUseCase).execute({
    contratoId: job.data.contrato,
    referencia: moment(job.data.referencia).toDate(),
  });

  await job.updateProgress(100);
}
const options = {
  concurrency: 2,
  useWorkerThreads: true,
  removeOnComplete: {
    age: 3600 / 3, // keep up to 20 minutes
  },
} as WorkerOptions;

export const CALCULAR_BALANCO_WORKER = new CriarWorker(
  JobsEnum.CALCULAR_BALANCO_QUEUE,
  handle,
  options
);
