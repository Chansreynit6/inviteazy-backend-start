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

  controller.inviteUserToEvent.bind(controller)
  router.post(
    "/events/:eventId/invite",
    controller.inviteUserToEvent.bind(controller)
  );
  
  router.patch(
    "/:id",
    authMiddleware,
    validateIdInURLParam,
    controller.updateStatus.bind(controller)
  );
  router.get(
    "/event/:event_id/status",
    authMiddleware,
    controller.getGuestInsights.bind(controller)
  );
  router.patch('/checkin/:event_id/:user_id', authMiddleware, controller.checkin.bind(controller));
  router.patch('/checkout/:event_id/:user_id', authMiddleware, controller.checkout.bind(controller));

  return router;
}
