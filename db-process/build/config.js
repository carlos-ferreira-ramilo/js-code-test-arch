"use strict";
exports.__esModule = true;
exports.dbInstanceId = exports.socketServerURL = exports.logDirectory = exports.environment = void 0;
exports.environment = process.env.NODE_ENV || "development";
exports.logDirectory = process.env.LOG_DIR || "logs";
exports.socketServerURL = process.env.SOCKET_SERVER_URL || "ws://localhost:3002";
exports.dbInstanceId = process.env.DB_INSTANCE_ID || "db-0";
//# sourceMappingURL=config.js.map