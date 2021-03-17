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

  /**
   * Find the user by Id
   * @param userId
   * @returns If the user exists return Response User promise with success true. Success false with err in case not exists.
   */
  public async findById(userId: String): Promise<Response<User>> {
    try {
      let user = await this.db.get(userId);
      return new Response<User>(true, new User(JSON.parse(user)), undefined);
    } catch (err) {
      return new Response<User>(false, undefined, err.message);
    }
  }

  /**
   * Create the user
   * @param user
   * @returns If the user exists return success false with err, else the user is created and returns success true.
   */
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

  /**
   * Partial update of the user
   * @param user
   * @returns If the user exists update the user and success true. Success false with err in case not exists.
   */
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

  /**
   * Delete the user
   * @param userId
   * @returns success true but false in case of db error.
   */
  public async delete(userId: String): Promise<Response<User>> {
    try {
      await this.db.del(userId);
      return new Response<User>(true, undefined, undefined);
    } catch (err) {
      return new Response<User>(false, undefined, err.message);
    }
  }
}
