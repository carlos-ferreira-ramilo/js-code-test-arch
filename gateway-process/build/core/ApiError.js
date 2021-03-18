"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.NoDataError = exports.NoEntryError = exports.NotFoundError = exports.BadRequestError = exports.InternalError = exports.ApiError = void 0;
var config_1 = require("../config");
var ApiResponse_1 = require("./ApiResponse");
var ErrorType;
(function (ErrorType) {
    ErrorType["INTERNAL"] = "InternalError";
    ErrorType["NOT_FOUND"] = "NotFoundError";
    ErrorType["NO_ENTRY"] = "NoEntryError";
    ErrorType["NO_DATA"] = "NoDataError";
    ErrorType["BAD_REQUEST"] = "BadRequestError";
})(ErrorType || (ErrorType = {}));
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(type, message) {
        if (message === void 0) { message = "error"; }
        var _this = _super.call(this, type) || this;
        _this.type = type;
        _this.message = message;
        return _this;
    }
    ApiError.handle = function (err, res) {
        switch (err.type) {
            case ErrorType.INTERNAL:
                return new ApiResponse_1.InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_ENTRY:
            case ErrorType.NO_DATA:
                return new ApiResponse_1.NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new ApiResponse_1.BadRequestResponse(err.message).send(res);
            default: {
                var message = err.message;
                // Do not send failure message in production as it may send sensitive data
                if (config_1.environment === "production")
                    message = "Something wrong happened.";
                return new ApiResponse_1.InternalErrorResponse(message).send(res);
            }
        }
    };
    return ApiError;
}(Error));
exports.ApiError = ApiError;
var InternalError = /** @class */ (function (_super) {
    __extends(InternalError, _super);
    function InternalError(message) {
        if (message === void 0) { message = "Internal error"; }
        return _super.call(this, ErrorType.INTERNAL, message) || this;
    }
    return InternalError;
}(ApiError));
exports.InternalError = InternalError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message) {
        if (message === void 0) { message = "Bad Request"; }
        return _super.call(this, ErrorType.BAD_REQUEST, message) || this;
    }
    return BadRequestError;
}(ApiError));
exports.BadRequestError = BadRequestError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        if (message === void 0) { message = "Not Found"; }
        return _super.call(this, ErrorType.NOT_FOUND, message) || this;
    }
    return NotFoundError;
}(ApiError));
exports.NotFoundError = NotFoundError;
var NoEntryError = /** @class */ (function (_super) {
    __extends(NoEntryError, _super);
    function NoEntryError(message) {
        if (message === void 0) { message = "Entry don't exists"; }
        return _super.call(this, ErrorType.NO_ENTRY, message) || this;
    }
    return NoEntryError;
}(ApiError));
exports.NoEntryError = NoEntryError;
var NoDataError = /** @class */ (function (_super) {
    __extends(NoDataError, _super);
    function NoDataError(message) {
        if (message === void 0) { message = "No data available"; }
        return _super.call(this, ErrorType.NO_DATA, message) || this;
    }
    return NoDataError;
}(ApiError));
exports.NoDataError = NoDataError;
//# sourceMappingURL=ApiError.js.map