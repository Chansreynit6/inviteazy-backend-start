import { Pool } from "pg";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: "sreynit",
    host: "localhost",
    database: "invitation",
    password: "123456",
    port: 5441,
  });
  return pool;
};
