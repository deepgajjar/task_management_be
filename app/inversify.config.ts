import { Container } from "inversify";

import { TYPES } from "./types/inversifyTypes";
import { UserController, UserRepository, UserService } from "./interfaces/User/User";
import { userController } from "./controllers/UserController";
import { userService } from "./services/UserService";
import { userRepository } from "./repositories/UserRepository/userRepository";

const container = new Container();
container.bind<UserController>(TYPES.UserController).to(userController);
container.bind<UserService>(TYPES.UserService).to(userService);
container.bind<UserRepository>(TYPES.UserRepository).to(userRepository);


export { container };