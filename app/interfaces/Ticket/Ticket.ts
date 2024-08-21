import { Request, Response } from "express";

export interface TicketController {
  getAllTickets(req: Request | any, res: Response): Promise<any>;
  createTicket(req: Request | any, res: Response): Promise<any>;
}

export interface TicketService {
  createTicketService(body: any): Promise<any>;
}

export interface TicketRepository {
  createTicket(ticket: any): Promise<any>;
}
