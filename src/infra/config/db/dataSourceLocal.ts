import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const dataSourceLocal: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["./src/infra/data/models/*.ts"],
  migrations: ["./src/infra/data/migrations/*.ts"],
  subscribers: ["./src/infra/data/subscribers/*.ts"],
};

export default new DataSource(dataSourceLocal);
