import io from "../socket";
import Logger from "../core/Logger";
import sockets from "../socket";

export default class UserService {
  async getUser(userId: String) {
    let getResult = await new Promise((resolve, reject) => {
      sockets[0].emit("getUser", userId, (result) => {
        return resolve(result);
      });
    });
    return getResult;
  }

  async createUser(user) {
    let createResult = await new Promise((resolve, reject) => {
      sockets[0].emit("createUser", user, (result) => {
        return resolve(result);
      });
    });
    return createResult;
  }

  async updateUser(user) {
    let updateResult = await new Promise((resolve, reject) => {
      sockets[0].emit("updateUser", user, (result) => {
        return resolve(result);
      });
    });
    return updateResult;
  }

  async deleteUser(userId: String) {
    let deleteResult = await new Promise((resolve, reject) => {
      sockets[0].emit("deleteUser", userId, (result) => {
        return resolve(result);
      });
    });
    return deleteResult;
  }
}
