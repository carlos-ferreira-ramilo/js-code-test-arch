"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Logger_1 = __importDefault(require("./core/Logger"));
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var ApiError_1 = require("./core/ApiError");
var config_1 = require("./config");
var path_1 = __importDefault(require("path"));
// Server
var app = express_1["default"]();
app.use(express_1["default"].static(path_1["default"].resolve(__dirname, "../public")));
app.use(express_1["default"].urlencoded({ extended: false }));
app.use(express_1["default"].json());
// Routes
app.use("/api", routes_1["default"]);
// catch 404 and forward to error handler
app.use(function (req, res, next) { return next(new ApiError_1.NotFoundError()); });
// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err, req, res, next) {
    if (err instanceof ApiError_1.ApiError) {
        ApiError_1.ApiError.handle(err, res);
    }
    else {
        if (config_1.environment === "development") {
            Logger_1["default"].error(err);
            return res.status(500).send(err.message);
        }
        ApiError_1.ApiError.handle(new ApiError_1.InternalError(), res);
    }
});
app
    .listen(config_1.restPort, function () {
    Logger_1["default"].info("Rest Server started. Port: " + config_1.restPort);
})
    .on("error", function (e) { return Logger_1["default"].error(e); });
exports["default"] = app;
//# sourceMappingURL=app.js.map