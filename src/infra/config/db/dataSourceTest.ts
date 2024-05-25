import { DataSource, DataSourceOptions, Logger, QueryRunner } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const dataSourceTest: DataSourceOptions = {
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  logging: false,
  entities: ["./src/infra/data/models/*.ts"],
  migrations: ["./src/infra/data/migrations/*.ts"],
};

export default new DataSource(dataSourceTest);
