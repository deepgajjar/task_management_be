import { Container } from "inversify";

import { TYPES } from "./types/inversifyTypes";
import {
  UserController,
  UserRepository,
  UserService,
} from "./interfaces/User/User";
import { userController } from "./controllers/UserController";
import { userService } from "./services/UserService";
import { userRepository } from "./repositories/UserRepository/userRepository";
import { ticketController } from "./controllers/TicketController";
import { TicketController, TicketRepository, TicketService } from "./interfaces/Ticket/Ticket";
import { ticketRepository } from "./repositories/TicketRepository/ticketRepository";
import { ticketService } from "./services/TicketService";

const container = new Container();
container.bind<UserController>(TYPES.UserController).to(userController);
container.bind<UserService>(TYPES.UserService).to(userService);
container.bind<UserRepository>(TYPES.UserRepository).to(userRepository);

container.bind<TicketController>(TYPES.TicketController).to(ticketController);
container.bind<TicketRepository>(TYPES.TickeRepository).to(ticketRepository);
container.bind<TicketService>(TYPES.TicketService).to(ticketService);
export { container };
