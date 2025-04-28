export interface IInvitee {
  contribution: any;
  id?: string;
  event_id?: string;
  user_id: string;
  status?: 'pending' | 'accept' | 'maybe' | 'no' | 'busy';
  qr_code?: string;
  is_checked_in?: boolean;
  checked_in_at?: string; // ISO string or can use Date
  created_at?: string;    // Optional: if you want to expose this
}

export interface IInviteeWithoutId extends Omit<IInvitee, 'id'> { }

export interface IInviteeRepository {
  create(newInvitee: IInviteeWithoutId): IInvitee | PromiseLike<IInvitee>;
  findByEventId(event_id: string): unknown;
  updateStatus(inviteId: string, status: string): IInvitee | PromiseLike<IInvitee>;
  findAll(): Promise<IInvitee[]>;
  findById(id: string): Promise<IInvitee | null>;
  createInvitee(invitee: Omit<IInvitee, "id" | "created_at">): Promise<IInvitee>
  checkin(event_id:string,user_id:string):Promise<IInvitee>;
  checkout(event_id: string, user_id: string, gift: string): Promise<IInvitee>;
}

export interface IInviteeService {
  findByEventId(event_id: string): unknown;
  updateStatus(inviteId: string, status: any): unknown;
  updateInvitationStatus(inviteId: string, status: any): unknown;
  getUserInvitations(userId: any): unknown;
  inviteUser(eventId: string, user_id: any): unknown;
  getAllInvitees(): Promise<IInvitee[]>;
  getInviteeById(id: string): Promise<IInvitee>;
  createInvitee(invitee: Omit<IInvitee, "id" | "created_at">): Promise<IInvitee>;
  checkin(event_id: string, user_id: string): Promise<IInvitee>;
  checkout(event_id: string, user_id: string, gift: string): Promise<IInvitee>;
}