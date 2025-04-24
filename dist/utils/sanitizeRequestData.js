"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeRequestData = sanitizeRequestData;
const sensitiveFields = ["username", "password", "email", "token"];
function sanitizeRequestData(req) {
    const safeData = {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
    };
    if (req.body && Object.keys(req.body).length > 0) {
        const _a = req.body, { username, password, email } = _a, safeBody = __rest(_a, ["username", "password", "email"]);
        safeData.body = safeBody;
        sensitiveFields.forEach((field) => {
            if (req.body[field])
                safeData.body[field] = "[MASKED]";
        });
    }
    if (req.cookies && req.cookies.sessionId) {
        safeData.cookies = { sessionId: "[MASKED]" };
    }
    return safeData;
}
