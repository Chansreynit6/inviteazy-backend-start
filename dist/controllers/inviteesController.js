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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteeController = void 0;
const cacheService_1 = __importDefault(require("../services/cacheService"));
const userService_1 = require("../services/userService");
class InviteeController {
    constructor(inviteeService) {
        this.inviteeService = inviteeService;
    }
    // Get all invitees
    getAllInvitees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.inviteeService.getAllInvitees();
                res.json({ message: "Get all invitees", data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Get invitee by ID (with Redis cache)
    getInviteeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cacheKey = `invitee:${id}`;
                const cached = yield cacheService_1.default.get(cacheKey);
                if (cached) {
                    return res.json({ message: "Cache: Get invitee by ID", data: JSON.parse(cached) });
                }
                const result = yield this.inviteeService.getInviteeById(id);
                yield cacheService_1.default.set(cacheKey, JSON.stringify(result), 360); // Cache for 6 minutes
                res.json({ message: "API: Get invitee by ID", data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Create a new invitee
    createInvitee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const inviteeData = req.body;
                const newInvitee = yield this.inviteeService.createInvitee(inviteeData);
                res.status(201).json({ message: "New invitee created", data: newInvitee });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Invite multiple users to an event
    //   async inviteUser(req: Request, res: Response, next: NextFunction) {
    //     try {
    //       const { eventId } = req.params;
    //       const { user_id } = req.body; // expects { "user_ids": [1, 2, 3] }
    //       const invitations = await this.inviteeService.inviteUser(eventId, user_id);
    //       res.status(201).json({ message: "Users invited successfully", data: invitations });
    //     } catch (error) {
    //       next(error);
    //     }
    //   }
    inviteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.params;
                const { user_ids } = req.body;
                const user = new userService_1.UserService(user_ids);
                console.log(user);
                // Check if user_ids is provided
                if (!user_ids || user_ids.length === 0) {
                    res.status(400).json({ message: "User IDs are required" });
                    return; // Ensure no further code is executed after the response
                }
                // Call the service to handle inviting users
                const invitations = yield this.inviteeService.inviteUser(eventId, user_ids);
                res.status(201).json({ message: "Users invited successfully", data: invitations });
            }
            catch (error) {
                next(error); // Pass the error to the error handling middleware
            }
        });
    }
    // Get invitations for a specific user
    getUserInvitations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                console.log(userId);
                const invitations = yield this.inviteeService.getUserInvitations(userId);
                res.json({ message: "User invitations retrieved", data: invitations });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // Update invitee status
    updateStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { inviteId } = req.params;
                const { status } = req.body;
                const updated = yield this.inviteeService.updateStatus(inviteId, status);
                res.json({ message: "Invitee status updated", data: updated });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.InviteeController = InviteeController;
