import UserRepo from "../database/UserRepo";

export default class UserService {
  private static userRepoPrimary: UserRepo = new UserRepo(true);

  static async findById(userId: String) {
    return await this.userRepoPrimary.findById(userId);
  }

  static async create(user) {
    return await this.userRepoPrimary.create(user);
  }

  static async update(user) {
    return await this.userRepoPrimary.update(user);
  }

  static async delete(userId: String) {
    return await this.userRepoPrimary.delete(userId);
  }
}
