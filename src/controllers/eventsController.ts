import { NextFunction, Request, Response } from "express";
import { IEvent, IEventService } from "../interfaces/eventsInterface";
import redisCache from "../services/cacheService";

export class EventController {
  private eventService: IEventService;

  constructor(eventService: IEventService) {
    this.eventService = eventService;
  }

  async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.baseUrl, req.originalUrl);

      const result = await this.eventService.getAllEvents();
      res.json({ message: "Get all events.", data: result });
      return;
    } catch (error) {
      next(error);
    }
  }

  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const cacheKey = `data:${req.method}:${req.originalUrl}`;

      const cacheData = await redisCache.get(cacheKey);
      if (cacheData) {
        res.json({
          message: "Cache: Get event by Id",
          data: JSON.parse(cacheData),
        });
        return;
      }

      const { id } = req.params;
      const result = await this.eventService.getEventById(id);

      await redisCache.set(cacheKey, JSON.stringify(result), 360);

      res.json({ message: "Api: Get event by Id", data: result });
    } catch (error) {
      next(error);
    }
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        user_id,
        event_name,
        event_datetime,
        location,
        description,
      }: Omit<IEvent, "id"> = req.body;

      const newEvent = await this.eventService.createEvent({
        user_id,
        event_name,
        event_datetime,
        location,
        description,
      });

      res
        .status(201)
        .json({ message: "A new event was created.", data: newEvent });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
