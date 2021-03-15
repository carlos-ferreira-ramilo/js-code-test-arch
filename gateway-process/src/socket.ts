import { socketPort } from "./config";
import Logger from "./core/Logger";
import expressSocket from "express";
import { Socket } from "socket.io";
import _ from "lodash";
import DbInstanceDto from "./types/DbInstanceDto";

const appSocket = expressSocket();
const serverSocket = require("http").Server(appSocket);
const io = require("socket.io")(serverSocket);

const dbInstances: DbInstanceDto[] = [];

serverSocket.listen(socketPort, function () {
  Logger.info(`Socket Server started. Port: ${socketPort}`);
});

io.on("connection", (socket: Socket) => {
  Logger.info(`Cliente conectado. Socket ID: ${socket.id}`);

  socket.on("disconnect", () => {
    Logger.info(`Deregistering DB Instance. Socket ID [${socket.id}]`);
    let dbInstance = _.find(
      dbInstances,
      (itemDbInstance) => itemDbInstance.socket === socket
    );
    if (dbInstance) {
      dbInstance.up = false;
      Logger.info(`Deregistered DB Instance [${dbInstance.id}]`);
    }
  });

  socket.on("registerDBInstance", (dbInstanceId: String) => {
    Logger.info(`Registering DB Instance [${dbInstanceId}]`);
    let dbInstance = _.find(
      dbInstances,
      (itemDbInstance) => itemDbInstance.id === dbInstanceId
    );
    if (dbInstance) {
      dbInstance.socket = socket;
      dbInstance.up = true;
    }
    dbInstances.push(new DbInstanceDto(dbInstanceId, socket, true));
  });
});

export default dbInstances;
