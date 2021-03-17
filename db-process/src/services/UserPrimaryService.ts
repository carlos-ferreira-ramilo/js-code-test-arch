import User from "../types/User";
import Response from "../types/Response";
import Logger from "../core/Logger";
import UserRepo from "../database/UserRepo";

export default class UserPrimaryService {
  private static userRepoPrimary: UserRepo = new UserRepo(true);

  static async findById(userId: String): Promise<Response<User>> {
    Logger.debug(`UserPrimaryService.findById ${userId}`);
    return await this.userRepoPrimary.findById(userId);
  }

  static async create(user): Promise<Response<User>> {
    Logger.debug(`UserPrimaryService.create ${JSON.stringify(user)}`);
    return await this.userRepoPrimary.create(user);
  }

  static async update(user): Promise<Response<User>> {
    Logger.debug(`UserPrimaryService.update ${JSON.stringify(user)}`);
    return await this.userRepoPrimary.update(user);
  }

  static async delete(userId: String): Promise<Response<User>> {
    Logger.debug(`UserPrimaryService.delete ${userId}`);
    return await this.userRepoPrimary.delete(userId);
  }
}
