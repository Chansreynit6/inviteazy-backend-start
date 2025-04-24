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
exports.InviteeService = void 0;
class InviteeService {
    constructor(inviteeRepository) {
        this.inviteeRepository = inviteeRepository;
    }
    getAllInvitees() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inviteeRepository.findAll();
        });
    }
    getInviteeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitee = yield this.inviteeRepository.findById(id);
            if (!invitee) {
                throw Object.assign(new Error("Invitee not found"), { status: 404 });
            }
            return invitee;
        });
    }
    createInvitee(invitee) {
        return __awaiter(this, void 0, void 0, function* () {
            const newInvitee = yield this.inviteeRepository.create(invitee);
            return newInvitee;
        });
    }
    updateStatus(inviteId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedInvitee = yield this.inviteeRepository.updateStatus(inviteId, status);
            return updatedInvitee;
        });
    }
    updateInvitationStatus(inviteId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            // This is just an alias to updateStatus unless you plan different logic.
            return this.updateStatus(inviteId, status);
        });
    }
    getUserInvitations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const allInvitees = yield this.inviteeRepository.findAll();
            return allInvitees.filter(inv => inv.user_id === userId);
        });
    }
    inviteUser(eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newInvitee = {
                event_id: eventId,
                user_id: userId,
                status: "pending",
                is_checked_in: false,
                created_at: new Date().toISOString(),
            };
            return yield this.inviteeRepository.create(newInvitee);
        });
    }
}
exports.InviteeService = InviteeService;
