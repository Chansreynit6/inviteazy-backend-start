"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const userService_1 = require("./services/userService");
const userController_1 = require("./controllers/userController");
const authController_1 = require("./controllers/authController");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const db_1 = require("./config/postgresdb/db");
const userRepository_1 = require("./repositories/postgres/userRepository");
const loggingMiddleware_1 = require("./middlewares/loggingMiddleware");
// import { EventService } from "./services/eventService";
// import { PostgresEventRepository } from "./repositories/postgres/eventRepository";
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// Switch connection to database
// connectMongoDB();
const pgPool = (0, db_1.connectPostgresDb)();
// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new userRepository_1.PostgresUserRepository(pgPool);
// const eventRepository = new PostgresEventRepository(pgPool);
// Services
const userService = new userService_1.UserService(userRepository);
// const eventService = new EventService(eventRepository);
// Controllers
const userController = new userController_1.UserController(userService);
const authController = new authController_1.AuthController(userService);
// const eventController = new EventController(eventService);
// Middlewares
app.use(express_1.default.json());
app.use(loggingMiddleware_1.loggingMiddleware);
// Routes
app.use("/api/users", (0, userRoutes_1.default)(userController));
app.use("/api/auth", (0, authRoutes_1.default)(authController));
// Handle Errors
app.use(errorMiddleware_1.errorMiddleware);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
