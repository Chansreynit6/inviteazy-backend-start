import { Pool } from "pg";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mydb",
    password: "postgres",
    port: 5439,
  });
  return pool;
};





