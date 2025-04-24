import { Router } from "express";
import { EventController } from "../controllers/eventsController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  validateIdInURLParam,
  validateEvent,
} from "../middlewares/validationMiddleware";

export default function eventRoutes(controller: EventController): Router {
  const router = Router();

  router.get("/", authMiddleware, controller.getAllEvents.bind(controller));
  router.get(
    "/:id",
    authMiddleware,
    validateIdInURLParam,
    controller.getEventById.bind(controller)
  );
  router.post(
    "/",
    authMiddleware,
    validateEvent,
    controller.createEvent.bind(controller)
  );

  return router;
}
