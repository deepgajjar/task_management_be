import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { UserController, UserService } from "../interfaces/User/User";
import { TYPES } from "../types/inversifyTypes";

@injectable()
export class userController implements UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}
  async createUser(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await this.userService.createUserService(body);
      if (result?.status !== 201) {
        return res.status(result?.status).send({
          message: result?.message,
        });
      }
      return res.status(result?.status).send({
        token: result?.token,
        message: "User has been created successfully.",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Something went wrong.",
      });
    }
  }

  async signin(req: Request, res: Response) {
    try {
      const result = await this.userService.signInService(req?.body);
      if (result?.status !== 200) {
        return res.status(result?.status).send({
          message: result?.message,
        });
      }
      return res.status(result?.status).send({
        token: result?.token,
        message: "User has beend signed successfully.",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Something went wrong.",
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUserService();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send({
        message: "Something went wrong.",
      });
    }
  }

  async currentUserInfo(req: Request | any, res: Response) {
    try {
      const user = await this.userService.getUserInfo(req?.userData?.email);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({
        message: "Something went wrong.",
      });
    }
  }
}
