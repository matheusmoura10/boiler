import CriarFila from "./queue";
import { BullMonitorExpress } from "@bull-monitor/express";
import { BullMQAdapter } from "@bull-monitor/root/dist/bullmq-adapter";

export const enum JobsEnum {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export const HIGH = new CriarFila(JobsEnum.HIGH, {
  attempts: 3,
  backoff: {
    type: "fixed",
    delay: 1000,
  },
  removeOnComplete: true,
  priority: 1,
});

export const MEDIUM = new CriarFila(JobsEnum.MEDIUM, {
  attempts: 3,
  backoff: {
    type: "fixed",
    delay: 1000,
  },
  removeOnComplete: true,
  priority: 2,
});

export const LOW = new CriarFila(JobsEnum.LOW, {
  attempts: 3,
  backoff: {
    type: "fixed",
    delay: 1000,
  },
  removeOnComplete: true,
  priority: 3,
});

export const monitor = new BullMonitorExpress({
  queues: [
    new BullMQAdapter(HIGH.queue),
    new BullMQAdapter(MEDIUM.queue),
    new BullMQAdapter(LOW.queue),
  ],

  metrics: {
    collectInterval: { minutes: 1 },
    maxMetrics: 100,
  },
});
