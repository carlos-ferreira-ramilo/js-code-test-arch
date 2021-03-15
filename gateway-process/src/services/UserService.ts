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
    let createResult = await new Promise((resolve, reject) => {
      LoadBalancer.getSocketToEmit(user.group).emit(
        "createUser",
        user,
        (result) => {
          return resolve(result);
        }
      );
    });
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
      let idxBackup: number;
      let idxSocketsSend = 0;
      let idxSocketsResp = 0;
      for (const idx in dbInstances) {
        idxBackup = (Number(idx) + 1) % dbInstances.length;
        dbInstance = dbInstances[idxBackup].up
          ? dbInstances[idxBackup]
          : dbInstances[idx];
        idxSocketsSend++;
        dbInstance.socket.emit("getUser", userId, (result) => {
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
