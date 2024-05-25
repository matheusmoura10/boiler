import CriarFila from "./queue";
import { BullMonitorExpress } from "@bull-monitor/express";
import { BullMQAdapter } from "@bull-monitor/root/dist/bullmq-adapter";
import { Job, Queue, QueueEvents, WorkerOptions } from "bullmq";

export const enum JobsEnum {
  SALVAR_COTAS_QUEUE = "SALVAR_COTAS_QUEUE",
  CALCULAR_BALANCO_QUEUE = "CALCULAR_BALANCO_QUEUE",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export const SALVAR_COTAS_QUEUE = new CriarFila(JobsEnum.SALVAR_COTAS_QUEUE, {
  attempts: 1,
  backoff: {
    type: "fixed",
    delay: 1000,
  },
  removeOnComplete: {
    age: 3600 / 3, // keep up to 20 minutes
  },
  removeOnFail: {
    age: 24 * 3600, // keep up to 24 hours
  },
});

export const CALCULAR_BALANCO_QUEUE = new CriarFila(
  JobsEnum.CALCULAR_BALANCO_QUEUE,
  {
    attempts: 1,
    backoff: {
      type: "fixed",
      delay: 1000,
    },
    removeOnComplete: {
      age: 3600 / 3, // keep up to 20 minutes
    },
    removeOnFail: {
      age: 24 * 3600, // keep up to 24 hours
    },
  }
);

export const MEDIUM = new CriarFila(JobsEnum.MEDIUM, {
  attempts: 3,
  backoff: {
    type: "fixed",
    delay: 1000,
  },
  removeOnComplete: {
    age: 10000, // 10 seconds
  },
  removeOnFail: {
    age: 1000 * 60 * 60 * 24, // 1 hour
  },
  priority: 2,
});

export const LOW = new CriarFila(JobsEnum.LOW, {
  attempts: 3,
  backoff: {
    type: "fixed",
    delay: 1000,
  },
  removeOnComplete: {
    age: 10000, // 10 seconds
  },
  removeOnFail: {
    age: 1000 * 60 * 60 * 24, // 1 hour
  },
  priority: 3,
});

export const monitor = new BullMonitorExpress({
  queues: [
    new BullMQAdapter(SALVAR_COTAS_QUEUE.queue),
    new BullMQAdapter(CALCULAR_BALANCO_QUEUE.queue),
    new BullMQAdapter(MEDIUM.queue),
    new BullMQAdapter(LOW.queue),
  ],

  metrics: {
    collectInterval: { minutes: 1 },
    maxMetrics: 100,
  },
});

export async function obterProgressoQueue(queue: Queue) {
  const jobsCompletos = await queue.getCompletedCount();
  const jobsFalhados = await queue.getFailedCount();
  const jobsAtivos = await queue.getActiveCount();
  const jobsAguardando = await queue.getWaitingCount();

  const totalJobs = jobsCompletos + jobsFalhados + jobsAtivos + jobsAguardando;

  const percentualJobsCompletos = (jobsCompletos / totalJobs) * 100;
}
