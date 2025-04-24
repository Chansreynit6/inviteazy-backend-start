import { Router } from "express";
import { InviteeController } from "../controllers/inviteesController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  validateIdInURLParam,
  validateInvitee,
  validateInviteUsers,
  validateStatus,
} from "../middlewares/validationMiddleware";

export default function inviteRoutes(controller: InviteeController): Router {
  const router = Router();

  router.get("/", authMiddleware, controller.getAllInvitees.bind(controller));

  router.post(
    "/events/:eventId/invite",
    controller.inviteUserToEvent.bind(controller)
  );
  
  
  router.patch(
    "/status/:id",
    authMiddleware,
    validateIdInURLParam,
    validateStatus,
    controller.updateStatus.bind(controller)
  );

  return router;
}
