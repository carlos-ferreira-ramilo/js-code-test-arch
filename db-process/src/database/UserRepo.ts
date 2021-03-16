import Logger from "../core/Logger";
import level from "level-rocksdb";
import socketSecondary from "../server";

export default class UserRepo {
  private primary: boolean;
  private db: any;

  constructor(primary: boolean = true) {
    this.primary = primary;
    if (this.primary) {
      this.db = level("./dbprimary");
    } else {
      this.db = level("./dbsecondary");
    }
  }

  public async findById(userId: String) {
    try {
      let user = await this.db.get(userId);
      return { success: true, data: JSON.parse(user) };
    } catch (err) {
      return { success: false, err: err.message };
    }
  }

  public async create(user: any) {
    if ((await this.findById(user.id)).success === false) {
      try {
        await this.db.put(user.id, JSON.stringify(user));
        return { success: true };
      } catch (err) {
        return { success: false, err: err.message };
      }
    }
    return { success: false, err: "User already exists" };
  }

  public async update(user: any) {
    if ((await this.findById(user.id)).success === true) {
      try {
        await this.db.put(user.id, JSON.stringify(user));
        return { success: true };
      } catch (err) {
        return { success: false, err: err.message };
      }
    }
    return { success: false, err: "User does not exist" };
  }

  public async delete(userId: String) {
    try {
      await this.db.del(userId);
      return { success: true };
    } catch (err) {
      return { success: false, err: err.message };
    }
  }
}
