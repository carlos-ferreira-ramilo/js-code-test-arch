import { io } from "socket.io-client";
import { socketServerURL } from "./config";

import Logger from "./core/Logger";

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

socket.on("servermsg", function (mensaje) {
  Logger.info(`Recibido mensaje: ${JSON.stringify(mensaje)}`);
});
