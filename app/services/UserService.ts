import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import { UserRepository, UserService } from "../interfaces/User/User";
import { TYPES } from "../types/inversifyTypes";
import { generateToken } from "../utils/helpers/generateToken";
import { SALT } from "../types/constants";
import { config } from "../config/config";

@injectable()
export class userService implements UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {}
  async createUserService(body: any) {
    try {
      if (!(body?.email && body?.password && body?.username)) {
        return {
          status: 400,
          message: "Please fill all detail",
        };
      }

      const oldUser = await this.userRepository.getUserByEmail(body?.email);
      if (!!oldUser) {
        return {
          status: 400,
          message: "User already exist. please try to login",
        };
      }

      const hashedPassword = await bcrypt.hash(body?.password, SALT);

      const user = await this.userRepository.createUser({
        ...body,
        hashedPassword,
      });
      const token = generateToken(
        user,
        config.tokenSecret,
        config.tokenExpiredTime
      );
      return {
        status: 201,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async signInService(body: any) {
    try {
      const { email, password } = body;
      if (!(email && password)) {
        return { status: 400, message: "email and password required" };
      }
      const user = await this.userRepository.getUserByEmail(email);
      if (!!!user) {
        return { status: 404, message: "Invalid credentials" };
      }
      const hasPasswordMathced = await bcrypt.compare(password, user?.password);

      if (!hasPasswordMathced) {
        return { status: 404, message: "Invalid credentials" };
      }
      const token = generateToken(
        user,
        config.tokenSecret,
        config.tokenExpiredTime
      );
      return {
        status: 200,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllUserService() {
    try {
      const usersList = await this.userRepository.getAllUsers();
      return usersList;
    } catch (error) {
      throw error;
    }
  }
  async getUserInfo(email: string) {
    try {
      return await this.userRepository.getUserInfo(email);
    } catch (error) {
      throw error;
    }
  }
}
