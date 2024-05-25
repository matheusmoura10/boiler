import * as amqp from "amqplib";
import { rabbitOptionsConnect } from "../config/rabbit/rabbit.config";
import Mensageria from "./mensageria.interface";
import { logger } from "../logger/logger";

export default class RabbitService extends Mensageria {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  constructor() {
    super();
  }

  async conectar(): Promise<boolean> {
    if (this.connection && this.channel) {
      return true;
    }

    try {
      this.connection = await amqp.connect({
        ...rabbitOptionsConnect,
      });
      this.channel = await this.connection.createChannel();
      return true;
    } catch (err) {
      logger.error(`Erro ao conectar com o RabbitMQ: ${err}`);
      return false;
    }
  }

  async enviarMensagem(mensagem: Object, queue: string): Promise<void> {
    if (!this.channel || !this.connection) {
      await this.conectar();
    }

    const conteudo = JSON.stringify(mensagem);

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(conteudo), {
      persistent: true,
    });
  }

  async consumirMensagem(
    queue: string,
    callback: (msg: amqp.ConsumeMessage | null) => void
  ): Promise<void> {
    if (!this.channel || !this.connection) {
      await this.conectar();
    }

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, callback, { noAck: false });
  }

  ack(msg: amqp.ConsumeMessage | null): void {
    if (!this.channel || !this.connection) {
      return;
    }

    this.channel.ack(msg as amqp.Message);
  }

  nack(msg: amqp.ConsumeMessage | null): void {
    if (!this.channel || !this.connection) {
      return;
    }

    this.channel.nack(msg as amqp.Message);
  }
}
