import Logger from "../core/Logger";
import LoadBalancer from "../helpers/loadBalancer";
import dbInstances from "../socket";
import DbInstanceDto from "../types/DbInstanceDto";

export default class UserService {
  async getUser(userId: string) {
    return await this.findUserInDbProcesses(userId);
  }

  async createUser(user) {
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
      instanceToEmit.secondary.socket.emit("createUserSecondary", user);
    }
    return createResult;
  }

  async updateUser(user) {
    return await this.updateUserInDbProcesses(user);
  }

  async deleteUser(userId: string) {
    return await this.deleteUserInDbProcesses(userId);
  }

  private findUserInDbProcesses(userId: string) {
    return new Promise((resolve, reject) => {
      let dbInstance: DbInstanceDto;
      let sendEvent: string;
      let idxBackup: number;
      let idxSocketsSend = 0;
      let idxSocketsResp = 0;
      for (const idx in dbInstances) {
        if (dbInstances[idx].secondary && dbInstances[idx].secondary.up) {
          dbInstance = dbInstances[idx].secondary;
          sendEvent = "getUserSecondary";
        } else {
          dbInstance = dbInstances[idx];
          sendEvent = "getUser";
        }
        idxSocketsSend++;
        dbInstance.socket.emit(sendEvent, userId, (result) => {
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
          dbInstances[idx].secondary.socket.emit("updateUserSecondary", user);
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
          dbInstances[idx].secondary.socket.emit("deleteUserSecondary", userId);
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
}
