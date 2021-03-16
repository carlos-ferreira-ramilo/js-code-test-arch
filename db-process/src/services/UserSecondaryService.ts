import Logger from "../core/Logger";
import UserRepo from "../database/UserRepo";

export default class UserSecondaryService {
  private static userRepoSecondary: UserRepo = new UserRepo(false);

  static async findById(userId: String) {
    Logger.debug(`UserSecondaryService.findById ${userId}`);
    return await this.userRepoSecondary.findById(userId);
  }

  static async create(user) {
    Logger.debug(`UserSecondaryService.create ${JSON.stringify(user)}`);
    return await this.userRepoSecondary.create(user);
  }

  static async update(user) {
    Logger.debug(`UserSecondaryService.update ${JSON.stringify(user)}`);
    return await this.userRepoSecondary.update(user);
  }

  static async delete(userId: String) {
    Logger.debug(`UserSecondaryService.delete ${userId}`);
    return await this.userRepoSecondary.delete(userId);
  }
}
