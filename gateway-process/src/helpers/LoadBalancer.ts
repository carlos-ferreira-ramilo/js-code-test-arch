import DbInstanceDto from "DbInstanceDto";
import dbInstances from "../socket";

export default class LoadBalancer {
  static getSocketToEmit(group: number) {
    return LoadBalancer.getInstanceToEmit(group).socket;
  }
  static getInstanceToEmit(group: number) {
    return dbInstances[group % dbInstances.length];
  }
}
