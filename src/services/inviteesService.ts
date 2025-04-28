import {
  IInvitee,
  IInviteeRepository,
  IInviteeService,
  IInviteeWithoutId,
} from "../interfaces/inviteesInterface";

export class InviteeService implements IInviteeService {
  constructor(private inviteeRepository: IInviteeRepository) {}
  // checkin(event_id: string, user_id: string): Promise<IInvitee> {
  //   throw new Error("Method not implemented.");
  // }
  // checkout(event_id: string, user_id: string, gift: string): Promise<IInvitee> {
  //   throw new Error("Method not implemented.");
  // }
  async findByEventId(event_id: string): Promise<IInvitee[]> {
    return await this.inviteeRepository.findByEventId(event_id) as IInvitee[];
  }
  
  async getAllInvitees(): Promise<IInvitee[]> {
    return await this.inviteeRepository.findAll();
  }

  async getInviteeById(id: string): Promise<IInvitee> {
    const invitee = await this.inviteeRepository.findById(id);
    if (!invitee) {
      throw Object.assign(new Error("Invitee not found"), { status: 404 });
    }
    return invitee;
  }

  async createInvitee(invitee: IInviteeWithoutId): Promise<IInvitee> {
    const newInvitee = await this.inviteeRepository.create(invitee);
    return newInvitee;
  }

  async updateStatus(inviteId: string, status: string): Promise<IInvitee> {
    const updatedInvitee = await this.inviteeRepository.updateStatus(inviteId, status);
    return updatedInvitee;
  }

  async updateInvitationStatus(inviteId: string, status: string): Promise<IInvitee> {
    // This is just an alias to updateStatus unless you plan different logic.
    return this.updateStatus(inviteId, status);
  }

  async getUserInvitations(userId: string): Promise<IInvitee[]> {
    const allInvitees = await this.inviteeRepository.findAll();
    return allInvitees.filter(inv => inv.user_id === userId);
  }

  async inviteUser(eventId: string, userId: string): Promise<IInvitee> {
    const newInvitee: IInviteeWithoutId = {
      event_id: eventId,
      user_id: userId,
      status: "pending",
      is_checked_in: false,
      created_at: new Date().toISOString(),
      contribution: undefined
    };
    return await this.inviteeRepository.create(newInvitee);
  }
  async checkin(event_id: string, user_id: string): Promise<IInvitee> {
    return await this.inviteeRepository.checkin(event_id,user_id)
  }
  async checkout(event_id: string, user_id: string, gift: string): Promise<IInvitee> {
    return await this.inviteeRepository.checkout(event_id, user_id, gift);
  }
  
}

  