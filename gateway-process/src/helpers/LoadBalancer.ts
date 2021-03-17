import dbInstances from "../socket";

export default class LoadBalancer {
  /**
   * Gets the socket to emit according the group of the user
   * @param group
   * @returns
   */
  static getSocketToEmit(group: number) {
    return LoadBalancer.getInstanceToEmit(group).socket;
  }

  /**
   *
   * @param group Gets the db instance according the group of the user
   * @returns
   */
  static getInstanceToEmit(group: number) {
    return dbInstances[group % dbInstances.length];
  }
}
