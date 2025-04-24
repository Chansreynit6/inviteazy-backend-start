import mysql from "mysql2/promise";

export const connectMysqlDb = () => {
  const pool = mysql.createPool({
    host: "localhost",
    user: "wmad",
    password: "123456",
    database: "mydb",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return pool;
};
