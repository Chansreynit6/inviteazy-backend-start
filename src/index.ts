import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { AuthController } from "./controllers/authController";

import authRoutes from "./routes/authRoutes";
import { connectPostgresDb } from "./config/postgresdb/db";
import { PostgresUserRepository } from "./repositories/postgres/userRepository";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";

import { MongoUserRepository } from "./repositories/mongodb/userRepository";
import { connectMongoDB } from "./config/mongodb/db";
import { connectMysqlDb } from "./config/mysqldb/db";
import { MySQLUserRepository } from "./repositories/mysql/userRepository";
import eventRoutes from "./routes/eventsRoutes";
import { EventController } from "./controllers/eventsController";
import { EventService } from "./services/eventsService";
import { PostgresEventRepository } from "./repositories/postgres/eventsRepository";
import { PostgresInviteeRepository } from "./repositories/postgres/inviteesRepository";
import { InviteeService } from "./services/inviteesService";
import { InviteeController } from "./controllers/inviteesController";
import invitationRoutes from "./routes/inviteesRoutes";
import inviteesRoutes from "./routes/inviteesRoutes";



dotenv.config();

const app = express();
const port = 3000;

// Switch connection to database
// connectMongoDB();

const pgPool = connectPostgresDb();
// const mysql = connectMysqlDb();

// Repositories
// const userRepository = new MongoUserRepository();
const userRepository = new PostgresUserRepository(pgPool);

const eventsRepository = new PostgresEventRepository(pgPool);
const inviteesRepository = new PostgresInviteeRepository(pgPool);
// const userRepository = new MySQLUserRepository(mysql);


// Servicestrithay@$2000
const userService = new UserService(userRepository);

const eventsService = new EventService(eventsRepository);
const inviteesService = new InviteeService(inviteesRepository);





// Controllers
const userController = new UserController(userService);
const authController = new AuthController(userService);

const eventsController = new EventController(eventsService);
const invitessController = new InviteeController(inviteesService);



// Middlewares
app.use(express.json());
app.use(loggingMiddleware);

// Routes
app.use("/api/users", userRoutes(userController));
app.use("/api/auth", authRoutes(authController));
app.use("/api/events", eventRoutes(eventsController));
app.use("/api/invitees", inviteesRoutes(invitessController));


// Handle Errors
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
