import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "public", "user"]),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const idParamSchema = z.object({
  id: z.string(),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateIdInURLParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    idParamSchema.parse(req.params);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};


const eventSchema = z.object({
  user_id: z.string(),
  event_name: z.string().min(3, "Event name is required"),
  event_datetime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  location: z.string().min(3, "Location is required"),
  description: z.string().optional(),
});

export const validateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    eventSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

const statusSchema = z.object({
  status: z.enum(["accept", "maybe", "no", "busy"]),
});

export const validateStatus = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    statusSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const inviteeSchema = z.object({
  event_id: z.number(),
  user_id: z.number(),
  status: z.enum(["pending", "accept", "maybe", "no", "busy"]).optional(),
  qr_code: z.string().optional(),
  is_checked_in: z.boolean().optional(),
});

export const inviteUserSchema = z.object({
  user_ids: z.array(z.string()).min(1), // Use UUIDs for user IDs
});



export const validateInvitee = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    inviteeSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};

export const validateInviteUsers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    inviteUserSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    next(error);
  }
};


