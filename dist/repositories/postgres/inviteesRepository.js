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
exports.PostgresInviteeRepository = void 0;
const utils_1 = require("./utils");
class PostgresInviteeRepository {
    constructor(pool) {
        this.pool = pool;
    }
    updateStatus(inviteId, status) {
        throw new Error("Method not implemented.");
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `SELECT id, event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at 
       FROM invitees`);
            return rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `SELECT id, event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at 
       FROM invitees WHERE id = $1`, [id]);
            return rows[0] || null;
        });
    }
    create(invitee) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `INSERT INTO invitees (event_id, user_id, status, qr_code, is_checked_in, checked_in_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at`, [
                invitee.event_id,
                invitee.user_id,
                (_a = invitee.status) !== null && _a !== void 0 ? _a : 'pending',
                (_b = invitee.qr_code) !== null && _b !== void 0 ? _b : null,
                (_c = invitee.is_checked_in) !== null && _c !== void 0 ? _c : false,
                (_d = invitee.checked_in_at) !== null && _d !== void 0 ? _d : null,
            ]);
            return rows[0];
        });
    }
}
exports.PostgresInviteeRepository = PostgresInviteeRepository;
