import Logger from "../core/Logger";
import level from "level-rocksdb";

const db = level("./mydb");

export default class UserRepo {
  public static async findById(userId: String) {
    try {
      let user = await db.get(userId);
      return { success: true, data: JSON.parse(user) };
    } catch (err) {
      return { success: false, err: err.message };
    }
  }

  public static async create(user: any) {
    if ((await this.findById(user.id)).success === false) {
      try {
        await db.put(user.id, JSON.stringify(user));
        return { success: true };
      } catch (err) {
        return { success: false, err: err.message };
      }
    }
    return { success: false, err: "User already exists" };
  }

  public static async update(user: any) {
    if ((await this.findById(user.id)).success === true) {
      try {
        await db.put(user.id, JSON.stringify(user));
        return { success: true };
      } catch (err) {
        return { success: false, err: err.message };
      }
    }
    return { success: false, err: "User does not exist" };
  }

  public static async delete(userId: String) {
    try {
      await db.del(userId);
      return { success: true };
    } catch (err) {
      return { success: false, err: err.message };
    }
  }
}
