import Logger from "../core/Logger";
import level from "level-rocksdb";
import User from "../types/User";
import Response from "../types/Response";

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

  public async findById(userId: String): Promise<Response<User>> {
    try {
      let user = await this.db.get(userId);
      return new Response<User>(true, new User(JSON.parse(user)), undefined);
      // return { success: true, data: JSON.parse(user) };
    } catch (err) {
      return new Response<User>(false, undefined, err.message);
    }
  }

  public async create(user: any): Promise<Response<User>> {
    if ((await this.findById(user.id)).success === false) {
      try {
        await this.db.put(user.id, JSON.stringify(user));
        return new Response<User>(true, undefined, undefined);
      } catch (err) {
        return new Response<User>(false, undefined, err.message);
      }
    }
    return new Response<User>(false, undefined, "User already exists");
  }

  public async update(user: User): Promise<Response<User>> {
    let resultFind: Response<User>;
    if ((resultFind = await this.findById(user.id)).success === true) {
      try {
        await this.db.put(
          user.id,
          JSON.stringify(resultFind.data.update(user))
        );
        return new Response<User>(true, undefined, undefined);
      } catch (err) {
        return new Response<User>(false, undefined, err.message);
      }
    }
    return new Response<User>(false, undefined, "User does not exist");
  }

  public async delete(userId: String): Promise<Response<User>> {
    try {
      await this.db.del(userId);
      return new Response<User>(true, undefined, undefined);
    } catch (err) {
      return new Response<User>(false, undefined, err.message);
    }
  }
}
