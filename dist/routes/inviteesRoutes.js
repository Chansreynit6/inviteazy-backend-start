"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = inviteRoutes;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
function inviteRoutes(controller) {
    const router = (0, express_1.Router)();
    router.get("/", authMiddleware_1.authMiddleware, controller.getAllInvitees.bind(controller));
    router.post("/events/:eventId/invite", authMiddleware_1.authMiddleware, validationMiddleware_1.validateIdInURLParam, validationMiddleware_1.validateInviteUsers, controller.inviteUser.bind(controller));
    router.patch("/status/:id", authMiddleware_1.authMiddleware, validationMiddleware_1.validateIdInURLParam, validationMiddleware_1.validateStatus, controller.updateStatus.bind(controller));
    return router;
}
