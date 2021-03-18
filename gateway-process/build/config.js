"use strict";
exports.__esModule = true;
exports.socketPort = exports.restPort = exports.logDirectory = exports.environment = void 0;
exports.environment = process.env.NODE_ENV || "development";
exports.logDirectory = process.env.LOG_DIR || "logs";
exports.restPort = process.env.REST_PORT || 3001;
exports.socketPort = Number(process.env.SOCKET_PORT) || 3002;
//# sourceMappingURL=config.js.map