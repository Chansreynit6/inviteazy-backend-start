"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMysqlDb = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const connectMysqlDb = () => {
    const pool = promise_1.default.createPool({
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
exports.connectMysqlDb = connectMysqlDb;
