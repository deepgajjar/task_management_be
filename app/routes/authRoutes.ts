import { Router } from "express";
import { container } from "../inversify.config";
import { UserController } from "../interfaces/User/User";
import { TYPES } from "../types/inversifyTypes";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();
const userController = container.get<UserController>(TYPES.UserController);
router.post("/user/create", userController.createUser.bind(userController));
router.post("/user/signin", userController.signin.bind(userController));
router.get(
  "/user/getAll",
  verifyToken,
  userController.getAllUsers.bind(userController)
);
router.get(
  "/user/me",
  verifyToken,
  userController.currentUserInfo.bind(userController)
);


export default router;
