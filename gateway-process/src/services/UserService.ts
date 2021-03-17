import Logger from "../core/Logger";
import LoadBalancer from "../helpers/loadBalancer";
import dbInstances from "../socket";
import _ from "lodash";
import { Socket } from "socket.io";

export default class UserService {
  /**
   * Get the user by Id
   * @param userId
   * @returns If the user exists return Response User promise with success true. Success false with err in case not exists.
   */
  async getUser(userId: string) {
    Logger.debug(`UserService.getUser ${userId}`);
    return await this.findUserInDbProcesses(userId);
  }

  /**
   * Create the user
   * @param user
   * @returns If the user exists return success false with err, else the user is created and returns success true.
   */
  async createUser(user) {
    Logger.debug(`UserService.createUser ${JSON.stringify(user)}`);
    let findUserResult: any = await this.findUserInDbProcesses(user.id);
    if (findUserResult.success) {
      return { success: false, err: "User already exists" };
    }
    let instanceToEmit = LoadBalancer.getInstanceToEmit(user.group);
    let createResult = await new Promise((resolve, reject) => {
      instanceToEmit.socket.emit("createUser", user, (result) => {
        return resolve(result);
      });
    });
    if (instanceToEmit.secondary) {
      instanceToEmit.secondary.emit("createUserSecondary", user);
    }
    return createResult;
  }

  /**
   * Partial update of the user
   * @param user
   * @returns If the user exists update the user and success true. Success false with err in case not exists.
   */
  async updateUser(user) {
    Logger.debug(`UserService.updateUser ${JSON.stringify(user)}`);
    return await this.updateUserInDbProcesses(user);
  }

  /**
   * Delete the user
   * @param userId
   * @returns success true but false in case of db error.
   */
  async deleteUser(userId: string) {
    Logger.debug(`UserService.deleteUser ${userId}`);
    return await this.deleteUserInDbProcesses(userId);
  }

  private findUserInDbProcesses(userId: string) {
    return new Promise((resolve, reject) => {
      let socket: Socket;
      let sendEvent: string;
      let idxBackup: number;
      let idxSocketsSend = 0;
      let idxSocketsResp = 0;
      for (const idx in dbInstances) {
        if (
          dbInstances[idx].secondary &&
          this.isSocketUp(dbInstances[idx].secondary)
        ) {
          socket = dbInstances[idx].secondary;
          sendEvent = "getUserSecondary";
        } else {
          socket = dbInstances[idx].socket;
          sendEvent = "getUser";
        }
        idxSocketsSend++;
        socket.emit(sendEvent, userId, (result) => {
          if (result.success) {
            return resolve(result);
          }
          idxSocketsResp++;
          if (idxSocketsResp === idxSocketsSend) {
            return resolve(result);
          }
        });
      }
    });
  }

  private updateUserInDbProcesses(user) {
    return new Promise((resolve, reject) => {
      let idxSocketsSend = 0;
      let idxSocketsResp = 0;
      for (const idx in dbInstances) {
        if (dbInstances[idx].secondary) {
          dbInstances[idx].socket.emit("updateUserSecondary", user);
        }
        idxSocketsSend++;
        dbInstances[idx].socket.emit("updateUser", user, (result) => {
          if (result.success) {
            return resolve(result);
          }
          idxSocketsResp++;
          if (idxSocketsResp === idxSocketsSend) {
            return resolve(result);
          }
        });
      }
    });
  }

  private deleteUserInDbProcesses(userId: string) {
    return new Promise((resolve, reject) => {
      let idxSocketsSend = 0;
      let idxSocketsResp = 0;
      for (const idx in dbInstances) {
        if (dbInstances[idx].secondary) {
          dbInstances[idx].socket.emit("deleteUserSecondary", userId);
        }
        idxSocketsSend++;
        dbInstances[idx].socket.emit("deleteUser", userId, (result) => {
          if (result.success) {
            return resolve(result);
          }
          idxSocketsResp++;
          if (idxSocketsResp === idxSocketsSend) {
            return resolve(result);
          }
        });
      }
    });
  }

  private isSocketUp(socket: Socket) {
    let dbInstance = _.find(
      dbInstances,
      (itemDbInstance) => itemDbInstance.socket === socket
    );
    if (dbInstance) {
      return dbInstance.up;
    }
    return false;
  }
}
