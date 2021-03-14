import { socketPort } from "./config";
import Logger from "./core/Logger";
import expressSocket from "express";
import { Socket } from "socket.io";
import _ from "lodash";

const appSocket = expressSocket();
const serverSocket = require("http").Server(appSocket);
const io = require("socket.io")(serverSocket);

const sockets: Socket[] = [];

serverSocket.listen(socketPort, function () {
  Logger.info(`Socket Server started. Port: ${socketPort}`);
});

io.on("connection", (socket: Socket) => {
  sockets.push(socket);
  Logger.info(`Cliente conectado. Socket ID: ${socket.id}`);

  socket.emit("servermsg", {
    data: "Hi",
  });

  socket.on("clientmsg", (mensaje) => {
    Logger.info(`Recibido mensaje: ${JSON.stringify(mensaje)}`);
  });

  socket.on("disconnect", () => {
    _.remove(sockets, function (socketItem) {
      return socketItem === socket;
    });
  });
});

export default sockets;
