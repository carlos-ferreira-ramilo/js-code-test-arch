import User from "../types/User";
import Response from "../types/Response";
import Logger from "../core/Logger";
import UserRepo from "../database/UserRepo";

export default class UserPrimaryService {
  private static userRepoPrimary: UserRepo = new UserRepo(true);

  /**
   * Find the user by Id
   * @param userId
   * @returns If the user exists return Response User promise with success true. Success false with err in case not exists.
   */
  static async findById(userId: String): Promise<Response<User>> {
    Logger.debug(`UserPrimaryService.findById ${userId}`);
    return await this.userRepoPrimary.findById(userId);
  }

  /**
   * Create the user
   * @param user
   * @returns If the user exists return success false with err, else the user is created and returns success true.
   */
  static async create(user): Promise<Response<User>> {
    Logger.debug(`UserPrimaryService.create ${JSON.stringify(user)}`);
    return await this.userRepoPrimary.create(user);
  }

  /**
   * Partial update of the user
   * @param user
   * @returns If the user exists update the user and success true. Success false with err in case not exists.
   */
  static async update(user): Promise<Response<User>> {
    Logger.debug(`UserPrimaryService.update ${JSON.stringify(user)}`);
    return await this.userRepoPrimary.update(user);
  }

  /**
   * Delete the user
   * @param userId
   * @returns success true but false in case of db error.
   */
  static async delete(userId: String): Promise<Response<User>> {
    Logger.debug(`UserPrimaryService.delete ${userId}`);
    return await this.userRepoPrimary.delete(userId);
  }
}
