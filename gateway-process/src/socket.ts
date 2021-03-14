import { socketPort } from "./config";
import Logger from "./core/Logger";
import expressSocket from "express";

const appSocket = expressSocket();
const serverSocket = require("http").Server(appSocket);
const io = require("socket.io")(serverSocket);

serverSocket.listen(socketPort, function () {
  Logger.info(`Socket Server started. Port: ${socketPort}`);
});

io.on("connection", (socket) => {
  Logger.info(`Cliente conectado.`);

  socket.emit("servermsg", {
    data: "Hi",
  });

  socket.on("clientmsg", (mensaje) => {
    Logger.info(`Recibido mensaje: ${JSON.stringify(mensaje)}`);
  });
});

export default io;
