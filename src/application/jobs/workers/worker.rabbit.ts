import RabbitService from "../../../infra/mensageria/rabbit.service";
import * as amqp from "amqplib";
import { concessionariaPost } from "../../../presenters/request/concessionaria.request";
import SaveConcessionariaUsecase from "../../usecase/concessionarias/save.concessionaria.usecase";
import container from "../../../infra/IoC/container";
import { InserirConcessionariaInput } from "../../usecase/concessionarias/dto/input";
import { logger } from "../../../infra/logger/logger";

const services = new RabbitService();
let i = 0;

async function handle(message: amqp.ConsumeMessage | null) {
  try {
    const messageContent = message.content.toString();

    const messageParsed = JSON.parse(messageContent);

    const { body } = await concessionariaPost.parseAsync({
      body: messageParsed,
    });

    const data = body as InserirConcessionariaInput;

    await container.resolve(SaveConcessionariaUsecase).execute({
      nome: data.nome,
      estado: data.estado,
    });

    i++;

    logger.info(`Mensagem processada: ${messageContent}` + ` - ${i}`);

    services.ack(message);
  } catch (e) {
    services.nack(message);
  }
}

export const workerRabbit = services.consumirMensagem("fila-teste", handle);
