import { io, Socket } from "socket.io-client";
import { socketServerURL, dbInstanceId } from "./config";

import Logger from "./core/Logger";
import UserPrimaryService from "./services/UserPrimaryService";
import UserSecondaryService from "./services/UserSecondaryService";

Logger.info(`db-process init.`);

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

const socket = io(socketServerURL);

let socketSecondary: Socket = null;

socket.on("connect", () => {
  Logger.info(`db-process socket connect to the server.`);
  socket.emit("registerDBInstance", dbInstanceId);
});

socket.on("disconnect", () => {
  Logger.info(`db-process socket disconnect from the server.`);
});

socket.on("getUser", async (userId, callback) => {
  Logger.debug(`Recibido getUser. userId: ${userId}`);
  let result = await UserPrimaryService.findById(userId);
  return callback(result);
});

socket.on("createUser", async (user, callback) => {
  Logger.debug(`Recibido createUser. User: ${user}`);
  let result = await UserPrimaryService.create(user);
  return callback(result);
});

socket.on("updateUser", async (user, callback) => {
  Logger.debug(`Recibido updateUser. User: ${user}`);
  let result = await UserPrimaryService.update(user);
  return callback(result);
});

socket.on("deleteUser", async (userId, callback) => {
  Logger.debug(`Recibido deleteUser. userId: ${userId}`);
  let result = await UserPrimaryService.delete(userId);
  return callback(result);
});

socket.on("getUserSecondary", async (userId, callback) => {
  Logger.debug(`Recibido getUserSecondary. userId: ${userId}`);
  let result = await UserSecondaryService.findById(userId);
  return callback(result);
});

socket.on("createUserSecondary", async (user, callback) => {
  Logger.debug(`Recibido createUserSecondary. User: ${user}`);
  let result = await UserSecondaryService.create(user);
  return callback(result);
});

socket.on("updateUserSecondary", async (user, callback) => {
  Logger.debug(`Recibido updateUserSecondary. User: ${user}`);
  let result = await UserSecondaryService.update(user);
  return callback(result);
});

socket.on("deleteUserSecondary", async (userId, callback) => {
  Logger.debug(`Recibido deleteUserSecondary. userId: ${userId}`);
  let result = await UserSecondaryService.delete(userId);
  return callback(result);
});

export default socketSecondary;
