import { Request, Response } from "express";

export interface TicketController {
  getAllTickets(req: Request | any, res: Response): Promise<any>;
  createTicket(req: Request | any, res: Response): Promise<any>;
  getAssignedTickets(req: Request | any, res: Response): Promise<any>;
  updateTicket(req: Request | any, res: Response): Promise<any>;
}

export interface TicketService {
  createTicketService(body: any): Promise<any>;
  fetchAssignedTicketsService(userData: any): Promise<any>;
  updateTicketService(data: any, id: string): Promise<any>;
  fetchAllTicketsService(): Promise<any>;
}

export interface TicketRepository {
  createTicket(ticket: any): Promise<any>;
  fetchAssignedTickets(userId: string): Promise<any>;
  updateTicket(data: any, id: string): Promise<any>;
  fetchAllTickets(): Promise<any>;
}
