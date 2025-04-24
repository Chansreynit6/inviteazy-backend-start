import { Pool } from "pg";
import { IInvitee, IInviteeRepository } from "../../interfaces/inviteesInterface";
import { queryWithLogging } from "./utils";

export class PostgresInviteeRepository implements IInviteeRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
  createInvitee(invitee: Omit<IInvitee, "id" | "created_at">): Promise<IInvitee> {
    throw new Error("Method not implemented.");
  }
    updateStatus(inviteId: string, status: string): IInvitee | PromiseLike<IInvitee> {
        throw new Error("Method not implemented.");
    }

  async findAll(): Promise<IInvitee[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT id, event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at 
       FROM invitees`
    );
    return rows;
  }

  async findById(id: string): Promise<IInvitee | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT id, event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at 
       FROM invitees WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async create(invitee: Omit<IInvitee, "id">): Promise<IInvitee> {
    const { rows } = await queryWithLogging(
      this.pool,
      `INSERT INTO invitees (event_id, user_id, status, qr_code, is_checked_in, checked_in_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at`,
      [
        invitee.event_id,
        invitee.user_id,
        invitee.status ?? 'pending',
        invitee.qr_code ?? null,
        invitee.is_checked_in ?? false,
        invitee.checked_in_at ?? null,
      ]
    );
    return rows[0];
  }
}
