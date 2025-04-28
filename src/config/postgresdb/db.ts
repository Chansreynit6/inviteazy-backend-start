import { Pool } from "pg";
import { env } from "process";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: env.POSTGRES_USER ,
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DB,
    password: env.POSTGRES_PASSWORD,
    port: parseInt(env.POSTGRES_PORT || "5432"),
    // port: env.POSTGRES_PORT,
    // database: "invatation",
    // password: "123456",
    // port: 5432,
  });
  return pool;
};
