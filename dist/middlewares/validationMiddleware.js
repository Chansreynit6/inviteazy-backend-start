"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.validateInviteUsers = exports.validateInvitee = exports.inviteUserSchema = exports.inviteeSchema = exports.validateStatus = exports.validateEvent = exports.validateIdInURLParam = exports.validateLogin = exports.validateUser = void 0;

const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),

    role: zod_1.z.enum(["admin", "public", "user"]),

});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
const idParamSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
const validateUser = (req, res, next) => {
    try {
        userSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateUser = validateUser;
const validateLogin = (req, res, next) => {
    try {
        loginSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateLogin = validateLogin;
const validateIdInURLParam = (req, res, next) => {
    try {
        idParamSchema.parse(req.params);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateIdInURLParam = validateIdInURLParam;

const eventSchema = zod_1.z.object({
    user_id: zod_1.z.string().uuid(),
    event_name: zod_1.z.string().min(3, "Event name is required"),
    event_datetime: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    location: zod_1.z.string().min(3, "Location is required"),
    description: zod_1.z.string().optional(),
});
const validateEvent = (req, res, next) => {
    try {
        eventSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateEvent = validateEvent;
const statusSchema = zod_1.z.object({
    status: zod_1.z.enum(["accept", "maybe", "no", "busy"]),
});
const validateStatus = (req, res, next) => {
    try {
        statusSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateStatus = validateStatus;
exports.inviteeSchema = zod_1.z.object({
    event_id: zod_1.z.number(),
    user_id: zod_1.z.number(),
    status: zod_1.z.enum(["pending", "accept", "maybe", "no", "busy"]).optional(),
    qr_code: zod_1.z.string().optional(),
    is_checked_in: zod_1.z.boolean().optional(),
});
exports.inviteUserSchema = zod_1.z.object({
    user_ids: zod_1.z.array(zod_1.z.string()).min(1), // Use UUIDs for user IDs
});
const validateInvitee = (req, res, next) => {
    try {
        exports.inviteeSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateInvitee = validateInvitee;
const validateInviteUsers = (req, res, next) => {
    try {
        exports.inviteUserSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        next(error);
    }
};
exports.validateInviteUsers = validateInviteUsers;

