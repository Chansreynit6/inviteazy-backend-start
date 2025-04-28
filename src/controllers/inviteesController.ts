// import { NextFunction, Request, Response } from "express";
// import { IInvitee, IInviteeService } from "../interfaces/inviteesInterface";
// import redisCache from "../services/cacheService";
// import { UserService } from "../services/userService";
// import { log } from "console";
// import { string } from "joi";

// export class InviteeController {
//   static inviteUser: any;
//   userService: any;
//   eventsService: any;
//   constructor(private inviteeService: IInviteeService) {}

//   // Get all invitees
//   async getAllInvitees(req: Request, res: Response, next: NextFunction) {
//     try {
//       const result = await this.inviteeService.getAllInvitees();
//       res.json({ message: "Get all invitees", data: result });
//     } catch (error) {
//       next(error);
//     }
//   }

//   // Get invitee by ID (with Redis cache)
//   async getInviteeById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { id } = req.params;
//       const cacheKey = `invitee:${id}`;

//       const cached = await redisCache.get(cacheKey);
//       if (cached) {
//         return res.json({ message: "Cache: Get invitee by ID", data: JSON.parse(cached) });
//       }

//       const result = await this.inviteeService.getInviteeById(id);
//       await redisCache.set(cacheKey, JSON.stringify(result), 360); // Cache for 6 minutes

//       res.json({ message: "API: Get invitee by ID", data: result });
//     } catch (error) {
//       next(error);
//     }
//   }

//   // Create a new invitee
//   async createInvitee(req: Request, res: Response, next: NextFunction) {
//     try {
//       const inviteeData: Omit<IInvitee, "id"> = req.body;
//       const newInvitee = await this.inviteeService.createInvitee(inviteeData);
//       res.status(201).json({ message: "New invitee created", data: newInvitee });
//     } catch (error) {
//       next(error);
//     }
//   }


// async inviteUserToEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
//   try {
//     const { eventId } = req.params;
//     const { user_id } = req.body;

//     console.log("====================", eventId);
//     const newInvitee = await this.inviteeService.createInvitee({
//       event_id: eventId,
//       user_id,
//       status: "pending",
//     });

//     res.status(201).json({ message: "User invited successfully", data: newInvitee });
//   } catch (error) {
//     next(error);
//   }
// }

//   // Get invitations for a specific user
//   async getUserInvitations(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { userId } = req.params;

//       console.log(userId);
      
      
//       const invitations = await this.inviteeService.getUserInvitations(userId);
//       res.json({ message: "User invitations retrieved", data: invitations });
//     } catch (error) {
//       next(error);
//     }
//   }

//   // Update invitee status
//   async updateStatus(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { id } = req.params;
//       const { status } = req.body;

//       console.log(id,"==============");
//       console.log(status, "======================");
      

//       const updated = await this.inviteeService.updateStatus(id, status);
//       res.json({ message: "Invitee status updated", data: updated });
//     } catch (error) {
//       next(error);
//     }
//   }
  
// }
// function uuid() {
//   throw new Error("Function not implemented.");
// }




import { NextFunction, Request, Response } from "express";
import { IInvitee, IInviteeService } from "../interfaces/inviteesInterface";
import redisCache from "../services/cacheService";

export class InviteeController {
  userService: any; // Consider adding proper type like IUserService
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
        return res.json({
          message: "Cache: Get invitee by ID",
          data: JSON.parse(cached),
        });
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

  // Invite user to an event
  async inviteUserToEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { eventId } = req.params;
      const { user_id } = req.body;

      const newInvitee = await this.inviteeService.createInvitee({
        event_id: eventId,
        user_id,
        status: "pending",
        contribution: undefined
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

      const updated = await this.inviteeService.updateStatus(id, status);
      res.json({ message: "Invitee status updated", data: updated });
    } catch (error) {
      next(error);
    }
  }

  // Get event guest insights
  async getGuestInsights(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const event_id = req.params.event_id;
      const insights = await this.inviteeService.findByEventId(event_id) as IInvitee[];

      const statusCounts = {
        totalInvited: insights.length,
        accepted: 0,
        maybe: 0,
        declined: 0,
        checkedIn: 0,
        totalContribution: 0,
      };

      for (const invitee of insights) {
        switch (invitee.status) {
          case "accept":
            statusCounts.accepted++;
            break;
          case "maybe":
            statusCounts.maybe++;
            break;
          case "no":
            statusCounts.declined++;
            break;
          default:
            // Optionally log or track unknown statuses
            break;
        }

        if (invitee.is_checked_in) {
          statusCounts.checkedIn++;
        }

        if (invitee.contribution) {
          statusCounts.totalContribution += invitee.contribution;
        }
      }

      res.status(200).json({ data: statusCounts });
    } catch (error) {
      console.error("Error fetching guest insights:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
