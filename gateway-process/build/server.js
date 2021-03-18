"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Logger_1 = __importDefault(require("./core/Logger"));
process.on("uncaughtException", function (e) {
    Logger_1["default"].error(e);
});
require("./app");
require("./socket");
//# sourceMappingURL=server.js.map