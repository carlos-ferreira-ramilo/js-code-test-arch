"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var winston_1 = require("winston");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var config_1 = require("../config");
// get path log directory from configuration
var dir = config_1.logDirectory;
if (!dir)
    dir = path_1["default"].resolve("logs");
// create directory if it is not present
if (!fs_1["default"].existsSync(dir)) {
    // Create the directory if it does not exist
    fs_1["default"].mkdirSync(dir);
}
// debug if we are in development environment
var logLevel = config_1.environment === "development" ? "debug" : "warn";
var options = {
    file: {
        level: logLevel,
        filename: dir + "/%DATE%.log",
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        prettyPrint: true,
        json: true,
        maxSize: "20m",
        colorize: true,
        maxFiles: "14d"
    }
};
exports["default"] = winston_1.createLogger({
    transports: [
        new winston_1.transports.Console({
            level: logLevel,
            format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.prettyPrint())
        }),
    ],
    exceptionHandlers: [new winston_daily_rotate_file_1["default"](options.file)],
    exitOnError: false
});
//# sourceMappingURL=Logger.js.map