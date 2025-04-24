import { NextFunction, Request, Response } from "express";
import { IInvitee, IInviteeService } from "../interfaces/inviteesInterface";
import redisCache from "../services/cacheService";
import { UserService } from "../services/userService";
import { log } from "console";
import { string } from "joi";

export class InviteeController {
  static inviteUser: any;
  userService: any;
  eventsService: any;
  constructor(private inviteeService: IInviteeService) {}

  // Get all invitees
  async getAllInvitees(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.inviteeService.getAllInvitees();
      res.json({ message: "Get all invitees", data: result });
    } catch (error) {
      next(error);
    }
  }

  // Get invitee by ID (with Redis cache)
  async getInviteeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const cacheKey = `invitee:${id}`;

      const cached = await redisCache.get(cacheKey);
      if (cached) {
        return res.json({ message: "Cache: Get invitee by ID", data: JSON.parse(cached) });
      }

      const result = await this.inviteeService.getInviteeById(id);
      await redisCache.set(cacheKey, JSON.stringify(result), 360); // Cache for 6 minutes

      res.json({ message: "API: Get invitee by ID", data: result });
    } catch (error) {
      next(error);
    }
  }

  // Create a new invitee
  async createInvitee(req: Request, res: Response, next: NextFunction) {
    try {
      const inviteeData: Omit<IInvitee, "id"> = req.body;
      const newInvitee = await this.inviteeService.createInvitee(inviteeData);
      res.status(201).json({ message: "New invitee created", data: newInvitee });
    } catch (error) {
      next(error);
    }
  }

  // Invite multiple users to an event
//   async inviteUser(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { eventId } = req.params;
//       const { user_id } = req.body; // expects { "user_ids": [1, 2, 3] }

//       const invitations = await this.inviteeService.inviteUser(eventId, user_id);
//       res.status(201).json({ message: "Users invited successfully", data: invitations });
//     } catch (error) {
//       next(error);
//     }
//   }

async inviteUserToEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { eventId } = req.params;
    const { user_id } = req.body;

    console.log("====================", eventId);
    const newInvitee = await this.inviteeService.createInvitee({
      event_id: eventId,
      user_id,
      status: "pending",
    });

    res.status(201).json({ message: "User invited successfully", data: newInvitee });
  } catch (error) {
    next(error);
  }
}

  // Get invitations for a specific user
  async getUserInvitations(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      console.log(userId);
      
      
      const invitations = await this.inviteeService.getUserInvitations(userId);
      res.json({ message: "User invitations retrieved", data: invitations });
    } catch (error) {
      next(error);
    }
  }

  // Update invitee status
  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      console.log(id,"==============");
      console.log(status, "======================");
      

      const updated = await this.inviteeService.updateStatus(id, status);
      res.json({ message: "Invitee status updated", data: updated });
    } catch (error) {
      next(error);
    }
  }
}
function uuid() {
  throw new Error("Function not implemented.");
}

