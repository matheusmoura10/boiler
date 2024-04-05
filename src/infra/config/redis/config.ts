import * as dotenv from "dotenv";

dotenv.config();

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisDb = process.env.REDIS_DB;
const redisPassword = process.env.REDIS_PASSWORD;

const redisOptions = {
  url: `redis://:${redisPassword}@${redisHost}:${redisPort}/${redisDb}`,
};

const redisOptionsConnect = {
  host: redisHost ?? "localhost",
  port: redisPort ? parseInt(redisPort) : 6379,
  password: redisPassword ?? "",
};

export { redisOptions, redisOptionsConnect };
