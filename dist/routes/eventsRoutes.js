"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = eventRoutes;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
function eventRoutes(controller) {
    const router = (0, express_1.Router)();
    router.get("/", authMiddleware_1.authMiddleware, controller.getAllEvents.bind(controller));
    router.get("/:id", authMiddleware_1.authMiddleware, validationMiddleware_1.validateIdInURLParam, controller.getEventById.bind(controller));
    router.post("/", authMiddleware_1.authMiddleware, validationMiddleware_1.validateEvent, controller.createEvent.bind(controller));
    return router;
}
