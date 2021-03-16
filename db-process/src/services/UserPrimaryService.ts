import { Socket } from "socket.io-client";
import Logger from "../core/Logger";
import UserRepo from "../database/UserRepo";
import socket from "../socket";

export default class UserPrimaryService {
  private static userRepoPrimary: UserRepo = new UserRepo(true);

  static async findById(userId: String) {
    Logger.debug(`UserPrimaryService.findById ${userId}`);
    return await this.userRepoPrimary.findById(userId);
  }

  static async create(user) {
    Logger.debug(`UserPrimaryService.create ${JSON.stringify(user)}`);
    return await this.userRepoPrimary.create(user);
  }

  static async update(user) {
    Logger.debug(`UserPrimaryService.update ${JSON.stringify(user)}`);
    return await this.userRepoPrimary.update(user);
  }

  static async delete(userId: String) {
    Logger.debug(`UserPrimaryService.delete ${userId}`);
    return await this.userRepoPrimary.delete(userId);
  }
}
