"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresEventRepository = void 0;
const utils_1 = require("./utils");
class PostgresEventRepository {
    constructor(pool) {
        this.pool = pool;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, "SELECT id, user_id, event_name, event_datetime, location, description FROM events");
            return rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, "SELECT id, user_id, event_name, event_datetime, location, description FROM events WHERE id = $1", [id]);
            return rows[0] || null;
        });
    }
    create(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `INSERT INTO events (user_id, event_name, event_datetime, location, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, event_name, event_datetime, location, description`, [
                event.user_id,
                event.event_name,
                event.event_datetime,
                event.location,
                (_a = event.description) !== null && _a !== void 0 ? _a : null,
            ]);
            return rows[0];
        });
    }
}
exports.PostgresEventRepository = PostgresEventRepository;
