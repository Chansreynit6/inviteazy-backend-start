export interface IEvent {
    id?: string;
    user_id: string;
    event_name: string;
    event_datetime: string; // ISO string or can use Date type
    location: string;
    description?: string;
  }
  
  export interface IEventWithoutId extends Omit<IEvent, "id"> {}
  
  export interface IEventRepository {
    findAll(): Promise<IEvent[]>;
    findById(id: string): Promise<IEvent | null>;
    create(event: IEventWithoutId): Promise<IEvent>;
  }
  
  export interface IEventService {
    getAllEvents(): Promise<IEvent[]>;
    getEventById(id: string): Promise<IEvent>;
    createEvent(event: IEventWithoutId): Promise<IEvent>;
  }
  