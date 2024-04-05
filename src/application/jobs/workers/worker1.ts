import { Job, WorkerOptions } from "bullmq";
import { CriarWorker } from "../../../infra/queue/jobs";
import { JobsEnum } from "../../../infra/queue/queue.config";
import SaveConcessionariaUsecase from "../../usecase/concessionarias/save.concessionaria.usecase";
import container from "../../../infra/IoC/container";
import { InserirConcessionariaInput } from "../../usecase/concessionarias/dto/input";

// Defina a função que será executada pelo worker
async function handle(job: Job<InserirConcessionariaInput>) {
  await job.updateProgress(0);

  container.resolve(SaveConcessionariaUsecase).execute({
    nome: job.data.nome,
    estado: job.data.estado,
  });

  await job.updateProgress(100);
}
const options = {
  concurrency: 5,
  useWorkerThreads: false,
} as WorkerOptions;

export const worker1 = new CriarWorker(JobsEnum.HIGH, handle, options);
