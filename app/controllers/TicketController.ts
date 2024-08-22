import { inject, injectable } from "inversify";
import { TicketController, TicketService } from "../interfaces/Ticket/Ticket";
import { Request, Response } from "express";
import { TYPES } from "../types/inversifyTypes";

@injectable()
export class ticketController implements TicketController {
  constructor(
    @inject(TYPES.TicketService) private ticketService: TicketService
  ) {}

  async getAllTickets(req: Request | any, res: Response) {
    try {
      const tickets = await this.ticketService.fetchAllTicketsService();
      return res.status(200).send(tickets);
    } catch (error) {
      return res.status(500).send({
        messaage: "Something went wrong",
      });
    }
  }

  async createTicket(req: Request | any, res: Response) {
    try {
      const { body } = req;
      if (!!!body?.title) {
        return res.status(400).send({
          message: "title is rquired for created ticket",
        });
      }
      const result = await this.ticketService.createTicketService({
        ...body,
        createdBy: req?.userData?._id,
      });
      return res.status(201).send({
        message: "ticket has been created.",
        data: result,
      });
    } catch (error) {
      return res.status(500).send({
        messaage: "Something went wrong",
      });
    }
  }

  async getAssignedTickets(req: Request | any, res: Response) {
    try {
      const ticket = await this.ticketService.fetchAssignedTicketsService(
        req?.userData
      );
      return res.status(200).send(ticket);
    } catch (error) {
      return res.status(500).send({
        messaage: "Something went wrong",
      });
    }
  }

  async updateTicket(req: Request | any, res: Response) {
    try {
      const result = await this.ticketService.updateTicketService(
        req?.body,
        req?.params?.id
      );
      return res.status(200).send({
        message: "ticket has been updated.",
      });
    } catch (error) {
      return res.status(500).send({
        messaage: "Something went wrong",
      });
    }
  }
}
