import { inject, injectable } from "inversify";
import { TicketRepository, TicketService } from "../interfaces/Ticket/Ticket";
import { TYPES } from "../types/inversifyTypes";

@injectable()
export class ticketService implements TicketService {
  constructor(
    @inject(TYPES.TickeRepository) private ticketRepository: TicketRepository
  ) {}
  async createTicketService(body: any) {
    try {
      const result = await this.ticketRepository.createTicket(body);
    } catch (error) {
      throw error;
    }
  }
}
