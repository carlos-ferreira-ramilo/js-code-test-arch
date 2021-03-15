import UserRepo from "../database/UserRepo";

export default class UserService {
  static async findById(userId: String) {
    return await UserRepo.findById(userId);
  }

  static async create(user) {
    return await UserRepo.create(user);
  }

  static async update(user) {
    return await UserRepo.update(user);
  }

  static async delete(userId: String) {
    return await UserRepo.delete(userId);
  }
}
