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
      const result = await this.ticketRepository.createTicket({
        ...body,
        assignedTo: !!body?.assignedTo ? body?.assignedTo : null,
      });
    } catch (error) {
      throw error;
    }
  }

  async fetchAssignedTicketsService(userData: any) {
    try {
      const tickets = await this.ticketRepository.fetchAssignedTickets(
        userData?._id
      );
      return tickets;
    } catch (error) {
      throw error;
    }
  }
  async updateTicketService(data: any, id: string) {
    try {
      return await this.ticketRepository.updateTicket(data, id);
    } catch (error) {
      throw error;
    }
  }

  async fetchAllTicketsService() {
    try {
      return await this.ticketRepository.fetchAllTickets();
    } catch (error) {
      throw error;
    }
  }
}
