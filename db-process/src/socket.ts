import { io } from "socket.io-client";
import { socketServerURL } from "./config";
import Logger from "./core/Logger";

const socket = io(socketServerURL);

socket.on("connect", () => {
  Logger.info(`db-process socket connect.`);
});

socket.on("disconnect", () => {
  Logger.info(`db-process socket disconnect.`);
});

export default socket;
