"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = loggingMiddleware;
const loggerService_1 = require("../services/loggerService");
function loggingMiddleware(req, res, next) {
    const startTime = Date.now();
    const requestLog = {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
    };
    loggerService_1.logger.info("Request received", requestLog);
    const originalSend = res.send;
    res.send = function (body) {
        const duration = Date.now() - startTime;
        const responseLog = {
            status: res.statusCode,
            body: typeof body === "string" ? body : JSON.stringify(body),
            duration: `${duration}ms`,
        };
        loggerService_1.logger.info("Response sent", responseLog);
        return originalSend.call(this, body);
    };
    next();
}
