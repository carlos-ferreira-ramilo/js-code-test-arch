"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ValidationSource = void 0;
var Logger_1 = __importDefault(require("../core/Logger"));
var ApiError_1 = require("../core/ApiError");
var ValidationSource;
(function (ValidationSource) {
    ValidationSource["BODY"] = "body";
    ValidationSource["HEADER"] = "headers";
    ValidationSource["QUERY"] = "query";
    ValidationSource["PARAM"] = "params";
})(ValidationSource = exports.ValidationSource || (exports.ValidationSource = {}));
exports["default"] = (function (schema, source) {
    if (source === void 0) { source = ValidationSource.BODY; }
    return function (req, res, next) {
        try {
            var error = schema.validate(req[source]).error;
            if (!error)
                return next();
            var details = error.details;
            var message = details
                .map(function (i) { return i.message.replace(/['"]+/g, ""); })
                .join(",");
            Logger_1["default"].error(message);
            next(new ApiError_1.BadRequestError(message));
        }
        catch (error) {
            next(error);
        }
    };
});
//# sourceMappingURL=validator.js.map