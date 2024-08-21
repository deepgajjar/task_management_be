import { Router } from "express";
import { container } from "../inversify.config";
import { TYPES } from "../types/inversifyTypes";
import { TicketController } from "../interfaces/Ticket/Ticket";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();
const ticketController = container.get<TicketController>(
  TYPES.TicketController
);
router.get(
  "/ticket/getAll",
  verifyToken,
  ticketController.getAllTickets.bind(ticketController)
);
router.post("/ticket/create", verifyToken,ticketController.createTicket.bind(ticketController));
// router.post("/user/signin", userController.signin.bind(userController));

export default router;
