import UserRepo from "../database/UserRepo";

export default class UserService {
  private static userRepoSecondary: UserRepo = new UserRepo(false);

  static async findById(userId: String) {
    return await this.userRepoSecondary.findById(userId);
  }

  static async create(user) {
    return await this.userRepoSecondary.create(user);
  }

  static async update(user) {
    return await this.userRepoSecondary.update(user);
  }

  static async delete(userId: String) {
    return await this.userRepoSecondary.delete(userId);
  }
}
