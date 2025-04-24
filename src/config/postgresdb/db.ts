import { Pool } from "pg";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: "sreynit",
    host: "localhost",
 5441,

    database: "mydb",
    password: "postgres",
    port: 5439,

  });
  return pool;
};


