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
  Logger.info(`Connected to the server.`);
  socket.emit("registerDBInstance", dbInstanceId);
});

socket.on("disconnect", () => {
  Logger.info(`Disconnect from the server.`);
});

socket.on("getUser", async (userId, callback) => {
  Logger.debug(`On getUser. userId: ${userId}`);
  let result = await UserPrimaryService.findById(userId);
  return callback(result);
});

socket.on("createUser", async (user, callback) => {
  Logger.debug(`On createUser. User: ${JSON.stringify(user)}`);
  let result = await UserPrimaryService.create(user);
  return callback(result);
});

socket.on("updateUser", async (user, callback) => {
  Logger.debug(`On updateUser. User: ${JSON.stringify(user)}`);
  let result = await UserPrimaryService.update(user);
  return callback(result);
});

socket.on("deleteUser", async (userId, callback) => {
  Logger.debug(`On deleteUser. userId: ${userId}`);
  let result = await UserPrimaryService.delete(userId);
  return callback(result);
});

socket.on("getUserSecondary", async (userId, callback) => {
  Logger.debug(`On getUserSecondary. userId: ${userId}`);
  let result = await UserSecondaryService.findById(userId);
  return callback(result);
});

socket.on("createUserSecondary", async (user, callback) => {
  Logger.debug(`On createUserSecondary. User: ${JSON.stringify(user)}`);
  let result = await UserSecondaryService.create(user);
  return callback(result);
});

socket.on("updateUserSecondary", async (user, callback) => {
  Logger.debug(`On updateUserSecondary. User: ${JSON.stringify(user)}`);
  let result = await UserSecondaryService.update(user);
  return callback(result);
});

socket.on("deleteUserSecondary", async (userId, callback) => {
  Logger.debug(`On deleteUserSecondary. userId: ${userId}`);
  let result = await UserSecondaryService.delete(userId);
  return callback(result);
});

export default socketSecondary;
