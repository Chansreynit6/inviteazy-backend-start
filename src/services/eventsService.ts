import {
    IEvent,
    IEventRepository,
    IEventService,
  } from "../interfaces/eventsInterface";
  
  export class EventService implements IEventService {
    constructor(private eventRepository: IEventRepository) {}
  
    async getAllEvents(): Promise<IEvent[]> {
      return await this.eventRepository.findAll();
    }
  
    async getEventById(id: string): Promise<IEvent> {
      const event = await this.eventRepository.findById(id);
      if (!event) {
        throw Object.assign(new Error("Event not found"), { status: 404 });
      }
      return event;
    }
  
    async createEvent(event: Omit<IEvent, "id">): Promise<IEvent> {
      return await this.eventRepository.create(event);
    }
  }
  