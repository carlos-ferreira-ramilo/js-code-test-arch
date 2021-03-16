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
  Logger.info(`Client connected. Socket ID: ${socket.id}`);

  socket.on("disconnect", () => {
    Logger.info(`Deregistering DB Instance. Socket ID [${socket.id}]`);
    Logger.debug(
      `dbInstances before disconnection ${JSON.stringify(dbInstances.length)}`
    );
    let dbInstance = _.find(
      dbInstances,
      (itemDbInstance) => itemDbInstance.socket === socket
    );
    if (dbInstance) {
      dbInstance.up = false;
      Logger.info(`Deregistered DB Instance [${dbInstance.id}]`);
    }
    Logger.debug(
      `dbInstandes after disconnection ${JSON.stringify(dbInstances.length)}`
    );
  });

  socket.on("registerDBInstance", (dbInstanceId: string) => {
    Logger.info(`Registering DB Instance [${dbInstanceId}]`);
    Logger.debug(
      `dbInstandes before register ${JSON.stringify(dbInstances.length)}`
    );
    let dbInstance = _.find(
      dbInstances,
      (itemDbInstance) => itemDbInstance.id === dbInstanceId
    );
    if (dbInstance) {
      dbInstance.socket = socket;
      dbInstance.up = true;
    } else {
      if (dbInstances.length === 0) {
        dbInstances.push(new DbInstanceDto(dbInstanceId, socket, true, null));
      } else {
        dbInstances[dbInstances.length - 1].secondary = socket;
        dbInstances.push(
          new DbInstanceDto(dbInstanceId, socket, true, dbInstances[0].socket)
        );
      }
    }
    Logger.debug(
      `dbInstandes after register ${JSON.stringify(dbInstances.length)}`
    );
  });
});

export default dbInstances;
