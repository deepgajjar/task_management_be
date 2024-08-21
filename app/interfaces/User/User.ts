import { Request, Response } from "express";
export interface UserController {
  createUser(req: Request, res: Response): Promise<any>;
  signin(req: Request, res: Response): Promise<any>;
}

export interface UserService {
  createUserService(body: any): Promise<any>;
  signInService(body: any): Promise<any>;
}

export interface UserRepository {
  createUser(user: any): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
}
