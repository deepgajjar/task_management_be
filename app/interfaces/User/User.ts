import { Request, Response } from "express";
export interface UserController {
  createUser(req: Request, res: Response): Promise<any>;
  signin(req: Request, res: Response): Promise<any>;
  getAllUsers(req: Request, res: Response): Promise<any>;
  currentUserInfo(req: Request | any, res: Response): Promise<any>;
}

export interface UserService {
  createUserService(body: any): Promise<any>;
  signInService(body: any): Promise<any>;
  getAllUserService(): Promise<any>;
  getUserInfo(email: string): Promise<any>;
}

export interface UserRepository {
  createUser(user: any): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  getAllUsers(): Promise<any>;
  getUserInfo(email: string): Promise<any>;
}
