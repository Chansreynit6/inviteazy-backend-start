"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = loggingMiddleware;
const loggerService_1 = require("../services/loggerService");
// import { sanitizeRequestData } from "../utils/sanitizeRequestData";
const sanitizeRequestData_1 = require("../utils/sanitizeRequestData");
// export function loggingMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const startTime = Date.now();
//   const requestLog = {
//     method: req.method,
//     url: req.url,
//     headers: req.headers,
//     body: req.body,
//   };
//   logger.info("Request received", requestLog);
//   const originalSend = res.send;
//   res.send = function (body) {
//     const duration = Date.now() - startTime;
//     const responseLog = {
//       status: res.statusCode,
//       body: typeof body === "string" ? body : JSON.stringify(body),
//       duration: `${duration}ms`,
//     };
//     logger.info("Response sent", responseLog);
//     return originalSend.call(this, body);
//   };
//   next();
// }
function loggingMiddleware(req, res, next) {
    const { method, url, headers, body } = req;
    loggerService_1.logger.info("Request received", {
        method,
        url,
        headers,
        body: (0, sanitizeRequestData_1.maskSensitiveData)(body),
    });
    next();
}
