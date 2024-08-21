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
    console.log("userData ==>>> ", req?.userData);
    return res.status(200).send([]);
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
      console.log("error ==>>> ", error);
      return res.status(500).send({
        messaage: "Something went wrong",
      });
    }
  }
}
