import { injectable } from "inversify";
import { TicketRepository } from "../../interfaces/Ticket/Ticket";
import Ticket from "../../models/Ticket";

@injectable()
export class ticketRepository implements TicketRepository {
  async createTicket(ticket: any) {
    try {
      const newTicket = new Ticket(ticket);
      const result = await newTicket.save();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
