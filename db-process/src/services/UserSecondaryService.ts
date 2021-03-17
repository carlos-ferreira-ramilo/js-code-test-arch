import User from "../types/User";
import Response from "../types/Response";
import Logger from "../core/Logger";
import UserRepo from "../database/UserRepo";

export default class UserSecondaryService {
  private static userRepoSecondary: UserRepo = new UserRepo(false);

  static async findById(userId: String): Promise<Response<User>> {
    Logger.debug(`UserSecondaryService.findById ${userId}`);
    return await this.userRepoSecondary.findById(userId);
  }

  static async create(user): Promise<Response<User>> {
    Logger.debug(`UserSecondaryService.create ${JSON.stringify(user)}`);
    return await this.userRepoSecondary.create(user);
  }

  static async update(user): Promise<Response<User>> {
    Logger.debug(`UserSecondaryService.update ${JSON.stringify(user)}`);
    return await this.userRepoSecondary.update(user);
  }

  static async delete(userId: String): Promise<Response<User>> {
    Logger.debug(`UserSecondaryService.delete ${userId}`);
    return await this.userRepoSecondary.delete(userId);
  }
}
