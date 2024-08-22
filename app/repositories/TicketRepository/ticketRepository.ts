import { injectable } from "inversify";
import { TicketRepository } from "../../interfaces/Ticket/Ticket";
import Ticket from "../../models/Ticket";
import { Types } from "mongoose";

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
  async fetchAllTickets() {
    try {
      const tickets = Ticket.aggregate([
        {
          $lookup: {
            from: "users",
            let: { assignedToId: "$assignedTo" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$assignedToId"],
                  },
                },
              },
              {
                $project: {
                  password: 0,
                  isDelete: 0,
                },
              },
            ],
            as: "assignedTo",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { createdById: "$createdBy" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$createdById"],
                  },
                },
              },
              {
                $project: {
                  password: 0,
                  isDelete: 0,
                },
              },
            ],
            as: "createdBy",
          },
        },
      ]);
      return tickets;
    } catch (error) {
      throw error;
    }
  }
  async fetchAssignedTickets(userId: string) {
    try {
      const tickets = Ticket.aggregate([
        {
          $match: {
            assignedTo: new Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "users",
            let: { assignedToId: "$assignedTo" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$assignedToId"],
                  },
                },
              },
              {
                $project: {
                  password: 0,
                  isDelete: 0,
                },
              },
            ],
            as: "assignedTo",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { createdById: "$createdBy" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$createdById"],
                  },
                },
              },
              {
                $project: {
                  password: 0,
                  isDelete: 0,
                },
              },
            ],
            as: "createdBy",
          },
        },
      ]);
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async updateTicket(data: any, id: string) {
    try {
      const updatedTicket = Ticket.updateOne(
        { _id: new Types.ObjectId(id) },
        { $set: data }
      );
      return updatedTicket;
    } catch (error) {
      throw error;
    }
  }
}
