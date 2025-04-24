"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectPostgresDb = void 0;
const pg_1 = require("pg");
const connectPostgresDb = () => {
    const pool = new pg_1.Pool({

        user: "postgres",
        host: "localhost",
        database: "mydb",
        password: "postgres",
        port: 5439,

    });
    return pool;
};
exports.connectPostgresDb = connectPostgresDb;
