import { Router } from "express";
import { container } from "../inversify.config";
import { UserController } from "../interfaces/User/User";
import { TYPES } from "../types/inversifyTypes";

const router = Router();
const userController = container.get<UserController>(TYPES.UserController);
router.post("/user/create", userController.createUser.bind(userController));
router.post("/user/signin", userController.signin.bind(userController));

export default router;
