import * as dotenv from "dotenv";
import { Options } from "amqplib";

dotenv.config();

const rabbitHost = process.env.RABBITMQ_HOST;
const rabbitPort = process.env.RABBITMQ_PORT;
const rabbitUser = process.env.RABBITMQ_USER;
const rabbitPassword = process.env.RABBITMQ_PASSWORD;
const rabbitVhost = process.env.RABBITMQ_VHOST;

const rabbitOptions = {
  url: `amqp://${rabbitUser}:${rabbitPassword}@${rabbitHost}/${rabbitUser}`,
};

const rabbitOptionsConnect = {
  hostname: rabbitHost,
  port: parseInt(rabbitPort),
  username: rabbitUser,
  password: rabbitPassword,
  vhost: rabbitVhost,
} as Options.Connect;

export { rabbitOptions, rabbitOptionsConnect };
