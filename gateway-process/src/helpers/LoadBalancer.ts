import DbInstanceDto from "DbInstanceDto";
import dbInstances from "../socket";

export default class LoadBalancer {
  static getSocketToEmit(group: number) {
    return dbInstances[group % dbInstances.length].socket;
  }
}
