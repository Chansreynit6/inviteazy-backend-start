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
const eventsRoutes_1 = __importDefault(require("./routes/eventsRoutes"));
const eventsController_1 = require("./controllers/eventsController");
const eventsService_1 = require("./services/eventsService");
const eventsRepository_1 = require("./repositories/postgres/eventsRepository");
const inviteesRepository_1 = require("./repositories/postgres/inviteesRepository");
const inviteesService_1 = require("./services/inviteesService");
const inviteesController_1 = require("./controllers/inviteesController");
const inviteesRoutes_1 = __importDefault(require("./routes/inviteesRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// Switch connection to database
// connectMongoDB();
const pgPool = (0, db_1.connectPostgresDb)();
// const mysql = connectMysqlDb();
// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new userRepository_1.PostgresUserRepository(pgPool);
const eventsRepository = new eventsRepository_1.PostgresEventRepository(pgPool);
const inviteesRepository = new inviteesRepository_1.PostgresInviteeRepository(pgPool);
// const userRepository = new MySQLUserRepository(mysql);
// Servicestrithay@$2000
const userService = new userService_1.UserService(userRepository);
const eventsService = new eventsService_1.EventService(eventsRepository);
const inviteesService = new inviteesService_1.InviteeService(inviteesRepository);
// Controllers
const userController = new userController_1.UserController(userService);
const authController = new authController_1.AuthController(userService);
const eventsController = new eventsController_1.EventController(eventsService);
const invitessController = new inviteesController_1.InviteeController(inviteesService);
// Middlewares
app.use(express_1.default.json());
app.use(loggingMiddleware_1.loggingMiddleware);
// Routes
app.use("/api/users", (0, userRoutes_1.default)(userController));
app.use("/api/auth", (0, authRoutes_1.default)(authController));
app.use("/api/events", (0, eventsRoutes_1.default)(eventsController));
app.use("/api/invitees", (0, inviteesRoutes_1.default)(invitessController));
// Handle Errors
app.use(errorMiddleware_1.errorMiddleware);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
