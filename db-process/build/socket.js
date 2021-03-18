"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var socket_io_client_1 = require("socket.io-client");
var config_1 = require("./config");
var Logger_1 = __importDefault(require("./core/Logger"));
var socket = socket_io_client_1.io(config_1.socketServerURL);
socket.on("connect", function () {
    Logger_1["default"].info("db-process socket connect.");
});
socket.on("disconnect", function () {
    Logger_1["default"].info("db-process socket disconnect.");
});
exports["default"] = socket;
//# sourceMappingURL=socket.js.map