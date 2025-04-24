"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectPostgresDb = void 0;
const pg_1 = require("pg");
const connectPostgresDb = () => {
    const pool = new pg_1.Pool({
        user: "sreynit",
        host: "localhost",
        database: "invitation",
        password: "123456",
        port: 5441,
    });
    return pool;
};
exports.connectPostgresDb = connectPostgresDb;
