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
      console.log("oldUser ==>>> ", oldUser);
      if (!!oldUser) {
        return {
          status: 400,
          message: "User Already Exist. Please Login",
        };
      }

      const hashedPassword = await bcrypt.hash(body?.password, SALT);

      const user = await this.userRepository.createUser({
        ...body,
        hashedPassword,
      });
      console.log("user ==>>> ", user);
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
      console.log("user ==>> ", user);
      if (!!!user) {
        return { status: 404, message: "Invalid credentials" };
      }
      const hasPasswordMathced = await bcrypt.compare(password, user?.password);
      console.log("hasPasswordMathced ==>> ", hasPasswordMathced);
      if (!hasPasswordMathced) {
        return { status: 404, message: "Invalid credentials" };
      }
      //   const token = createSecretToken(user._id);
      const token = generateToken(
        user,
        config.tokenSecret,
        config.tokenExpiredTime
      );
      //   res.cookie("token", token, {
      //     domain: process.env.frontend_url, // Set your domain here
      //     path: "/", // Cookie is accessible from all paths
      //     expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      //     secure: true, // Cookie will only be sent over HTTPS
      //     httpOnly: true, // Cookie cannot be accessed via client-side scripts
      //     sameSite: "None",
      //   });
      return {
        status: 200,
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
