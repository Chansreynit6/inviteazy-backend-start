import { Pool } from "pg";
import { IEvent, IEventRepository } from "../../interfaces/eventsInterface";
import { queryWithLogging } from "./utils";

export class PostgresEventRepository implements IEventRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<IEvent[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      "SELECT id, user_id, event_name, event_datetime, location, description FROM events"
    );
    return rows;
  }

  async findById(id: string): Promise<IEvent | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      "SELECT id, user_id, event_name, event_datetime, location, description FROM events WHERE id = $1",
      [id]
    );
    return rows[0] || null;
  }

  async create(event: Omit<IEvent, "id">): Promise<IEvent> {
    const { rows } = await queryWithLogging(
      this.pool,
      `INSERT INTO events (user_id, event_name, event_datetime, location, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, event_name, event_datetime, location, description`,
      [
        event.user_id,
        event.event_name,
        event.event_datetime,
        event.location,
        event.description ?? null,
      ]
    );
    return rows[0];
  }
}
