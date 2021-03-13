import Logger from "../core/Logger";

export default class UserService {
  constructor() {}

  getUser(userId: String) {
    Logger.debug(`UserService. getUser userId: ${userId}`);
  }

  createUser(user) {
    Logger.debug(`UserService. createUser user: ${user.id}`);
  }

  updateUser(user) {
    Logger.debug(`UserService. updateUser user: ${user.id}`);
  }

  deleteUser(userId: String) {
    Logger.debug(`UserService. deleteUser userId: ${userId}`);
  }
}
