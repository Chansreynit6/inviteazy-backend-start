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

  async findAll(): Promise<IInvitee[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT id, event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at 
       FROM invitees`
    );
    return rows;
  }

  async findByEventId(event_id: string): Promise<IInvitee[]> {
    const { rows } = await queryWithLogging(this.pool, "SELECT * FROM invitees WHERE event_id = $1", [event_id]);
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

  async updateStatus(inviteId: string, status: string): Promise<IInvitee> {
    const { rows } = await queryWithLogging(
      this.pool,
      `UPDATE invitees 
       SET status = $1 
       WHERE id = $2 
       RETURNING id, event_id, user_id, status, qr_code, is_checked_in, checked_in_at, created_at`,
      [status, inviteId]
    );

    if (rows.length === 0) {
      throw Object.assign(new Error("Invitee not found"), { status: 404 });
    }

    return rows[0];
  }
  async checkin(event_id: string, user_id: string): Promise<IInvitee> {
    const { rows } = await queryWithLogging(
        this.pool,
        `
          UPDATE invitees
          SET is_checked_in = true, checked_in_at = NOW()
          WHERE event_id = $1 AND user_id = $2
          RETURNING *`,
        [event_id, user_id]
    );
    if (rows.length === 0) {
        throw new Error("No invitee found for the given event_id and user_id");
    }
    return rows[0];
}
async checkout(event_id: string, user_id: string, gift: string): Promise<IInvitee> {
    // First, check if the invitee has already checked in
    const { rows } = await queryWithLogging(
        this.pool,
        "SELECT * FROM invitees WHERE event_id = $1 AND user_id = $2",
        [event_id, user_id]
    );

    if (rows.length === 0) {
        throw new Error("No invitee found for the given event_id and user_id");
    }

    const invitee = rows[0];

    // If the invitee is not checked in, prevent checkout
    if (!invitee.is_checked_in) {
        throw new Error("Cannot checkout. Please check-in first.");
    }

    // Proceed with checkout if checked-in
    const updateQuery = `
        UPDATE invitees
        SET 
            is_checked_out = true, 
            checked_out_at = NOW(), 
            gift = $3
        WHERE event_id = $1 AND user_id = $2
        RETURNING *`;

    const { rows: updatedRows } = await queryWithLogging(
        this.pool,
        updateQuery,
        [event_id, user_id, gift]
    );

    if (updatedRows.length === 0) {
        throw new Error("No invitee found for the given event_id and user_id during checkout");
    }

    return updatedRows[0];
}
}





