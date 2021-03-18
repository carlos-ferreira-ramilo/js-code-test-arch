"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var config_1 = require("./config");
var Logger_1 = __importDefault(require("./core/Logger"));
var express_1 = __importDefault(require("express"));
var lodash_1 = __importDefault(require("lodash"));
var DbInstanceDto_1 = __importDefault(require("./types/DbInstanceDto"));
var appSocket = express_1["default"]();
var serverSocket = require("http").Server(appSocket);
var io = require("socket.io")(serverSocket);
var dbInstances = [];
serverSocket.listen(config_1.socketPort, function () {
    Logger_1["default"].info("Socket Server started. Port: " + config_1.socketPort);
});
io.on("connection", function (socket) {
    Logger_1["default"].info("Client connected. Socket ID: " + socket.id);
    socket.on("disconnect", function () {
        Logger_1["default"].info("Deregistering DB Instance. Socket ID [" + socket.id + "]");
        Logger_1["default"].debug("dbInstances before disconnection " + JSON.stringify(dbInstances.length));
        var dbInstance = lodash_1["default"].find(dbInstances, function (itemDbInstance) { return itemDbInstance.socket === socket; });
        if (dbInstance) {
            dbInstance.up = false;
            Logger_1["default"].info("Deregistered DB Instance [" + dbInstance.id + "]");
        }
        Logger_1["default"].debug("dbInstandes after disconnection " + JSON.stringify(dbInstances.length));
    });
    socket.on("registerDBInstance", function (dbInstanceId) {
        Logger_1["default"].info("Registering DB Instance [" + dbInstanceId + "]");
        Logger_1["default"].debug("dbInstandes before register " + JSON.stringify(dbInstances.length));
        var dbInstance = lodash_1["default"].find(dbInstances, function (itemDbInstance) { return itemDbInstance.id === dbInstanceId; });
        if (dbInstance) {
            dbInstance.socket = socket;
            dbInstance.up = true;
        }
        else {
            if (dbInstances.length === 0) {
                dbInstances.push(new DbInstanceDto_1["default"](dbInstanceId, socket, true, null));
            }
            else {
                dbInstances[dbInstances.length - 1].secondary = socket;
                dbInstances.push(new DbInstanceDto_1["default"](dbInstanceId, socket, true, dbInstances[0].socket));
            }
        }
        Logger_1["default"].debug("dbInstandes after register " + JSON.stringify(dbInstances.length));
    });
});
exports["default"] = dbInstances;
//# sourceMappingURL=socket.js.map