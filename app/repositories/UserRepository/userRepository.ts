import { injectable } from "inversify";
import { UserRepository } from "../../interfaces/User/User";
import User from "../../models/User";

@injectable()
export class userRepository implements UserRepository {
  async createUser(user: any) {
    try {
      const newUser = new User({
        userName: user?.username,
        email: user?.email,
        password: user?.hashedPassword,
      });
      const result = await newUser.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserInfo(email: string) {
    try {
      const user = await User.findOne({ email }, { password: 0, isDelete: 0 });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find({}, { password: 0, isDelete: 0 });
      return users;
    } catch (error) {
      throw error;
    }
  }
}
