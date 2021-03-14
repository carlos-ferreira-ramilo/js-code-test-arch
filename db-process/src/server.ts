import { io } from "socket.io-client";
import { socketServerURL } from "./config";

import Logger from "./core/Logger";
import UserRepo from "./database/UserRepo";

Logger.info(`db-process init.`);

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

const socket = io("ws://localhost:3002");

socket.on("connect", () => {
  Logger.info(`db-process socket connect to the server.`);
});

socket.on("disconnect", () => {
  Logger.info(`db-process socket disconnect from the server.`);
});

socket.emit("clientmsg", {
  prueba: "prueba",
});

socket.on("createUser", async (user, callback) => {
  Logger.debug(`Recibido createUser. User: ${user}`);
  let result = await UserRepo.create(user);
  return callback(result);
});

socket.on("getUser", async (userId, callback) => {
  Logger.debug(`Recibido getUser. userId: ${userId}`);
  let result = await UserRepo.findById(userId);
  return callback(result);
});

socket.on("updateUser", async (user, callback) => {
  Logger.debug(`Recibido updateUser. User: ${user}`);
  let result = await UserRepo.update(user);
  return callback(result);
});

socket.on("deleteUser", async (userId, callback) => {
  Logger.debug(`Recibido deleteUser. userId: ${userId}`);
  let result = await UserRepo.delete(userId);
  return callback(result);
});
