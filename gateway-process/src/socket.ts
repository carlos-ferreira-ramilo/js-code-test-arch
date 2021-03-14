import { socketPort } from "./config";
import Logger from "./core/Logger";
import expressSocket from "express";

const appSocket = expressSocket();
const serverSocket = require("http").Server(appSocket);
const io = require("socket.io")(serverSocket);

serverSocket.listen(socketPort, function () {
  Logger.info(`Socket Server started. Port: ${socketPort}`);
});

io.sockets.on("connection", (socket) => {
  socket.send("Hello!");
});

export default io;
