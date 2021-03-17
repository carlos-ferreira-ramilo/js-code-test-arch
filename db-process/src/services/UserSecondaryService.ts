import User from "../types/User";
import Response from "../types/Response";
import Logger from "../core/Logger";
import UserRepo from "../database/UserRepo";

export default class UserSecondaryService {
  private static userRepoSecondary: UserRepo = new UserRepo(false);

  /**
   * Find the user by Id
   * @param userId
   * @returns If the user exists return Response User promise with success true. Success false with err in case not exists.
   */
  static async findById(userId: String): Promise<Response<User>> {
    Logger.debug(`UserSecondaryService.findById ${userId}`);
    return await this.userRepoSecondary.findById(userId);
  }

  /**
   * Create the user
   * @param user
   * @returns If the user exists return success false with err, else the user is created and returns success true.
   */
  static async create(user): Promise<Response<User>> {
    Logger.debug(`UserSecondaryService.create ${JSON.stringify(user)}`);
    return await this.userRepoSecondary.create(user);
  }

  /**
   * Partial update of the user
   * @param user
   * @returns If the user exists update the user and success true. Success false with err in case not exists.
   */
  static async update(user): Promise<Response<User>> {
    Logger.debug(`UserSecondaryService.update ${JSON.stringify(user)}`);
    return await this.userRepoSecondary.update(user);
  }

  /**
   * Delete the user
   * @param userId
   * @returns success true but false in case of db error.
   */
  static async delete(userId: String): Promise<Response<User>> {
    Logger.debug(`UserSecondaryService.delete ${userId}`);
    return await this.userRepoSecondary.delete(userId);
  }
}
