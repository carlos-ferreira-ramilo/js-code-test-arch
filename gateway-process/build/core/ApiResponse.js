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
exports.SuccessResponse = exports.FailureMsgResponse = exports.SuccessMsgResponse = exports.InternalErrorResponse = exports.BadRequestResponse = exports.NotFoundResponse = void 0;
// Helper code for the API consumer to understand the error and handle is accordingly
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "10000";
    StatusCode["FAILURE"] = "10001";
})(StatusCode || (StatusCode = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
var ApiResponse = /** @class */ (function () {
    function ApiResponse(statusCode, status, message) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
    ApiResponse.prototype.prepare = function (res, response) {
        return res.status(this.status).json(ApiResponse.sanitize(response));
    };
    ApiResponse.prototype.send = function (res) {
        return this.prepare(res, this);
    };
    ApiResponse.sanitize = function (response) {
        var clone = {};
        Object.assign(clone, response);
        // @ts-ignore
        delete clone.status;
        for (var i in clone)
            if (typeof clone[i] === "undefined")
                delete clone[i];
        return clone;
    };
    return ApiResponse;
}());
var NotFoundResponse = /** @class */ (function (_super) {
    __extends(NotFoundResponse, _super);
    function NotFoundResponse(message) {
        if (message === void 0) { message = "Not Found"; }
        return _super.call(this, StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message) || this;
    }
    NotFoundResponse.prototype.send = function (res) {
        var _a;
        this.url = (_a = res.req) === null || _a === void 0 ? void 0 : _a.originalUrl;
        return _super.prototype.prepare.call(this, res, this);
    };
    return NotFoundResponse;
}(ApiResponse));
exports.NotFoundResponse = NotFoundResponse;
var BadRequestResponse = /** @class */ (function (_super) {
    __extends(BadRequestResponse, _super);
    function BadRequestResponse(message) {
        if (message === void 0) { message = "Bad Parameters"; }
        return _super.call(this, StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message) || this;
    }
    return BadRequestResponse;
}(ApiResponse));
exports.BadRequestResponse = BadRequestResponse;
var InternalErrorResponse = /** @class */ (function (_super) {
    __extends(InternalErrorResponse, _super);
    function InternalErrorResponse(message) {
        if (message === void 0) { message = "Internal Error"; }
        return _super.call(this, StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message) || this;
    }
    return InternalErrorResponse;
}(ApiResponse));
exports.InternalErrorResponse = InternalErrorResponse;
var SuccessMsgResponse = /** @class */ (function (_super) {
    __extends(SuccessMsgResponse, _super);
    function SuccessMsgResponse(message) {
        return _super.call(this, StatusCode.SUCCESS, ResponseStatus.SUCCESS, message) || this;
    }
    return SuccessMsgResponse;
}(ApiResponse));
exports.SuccessMsgResponse = SuccessMsgResponse;
var FailureMsgResponse = /** @class */ (function (_super) {
    __extends(FailureMsgResponse, _super);
    function FailureMsgResponse(message) {
        return _super.call(this, StatusCode.FAILURE, ResponseStatus.SUCCESS, message) || this;
    }
    return FailureMsgResponse;
}(ApiResponse));
exports.FailureMsgResponse = FailureMsgResponse;
var SuccessResponse = /** @class */ (function (_super) {
    __extends(SuccessResponse, _super);
    function SuccessResponse(message, data) {
        var _this = _super.call(this, StatusCode.SUCCESS, ResponseStatus.SUCCESS, message) || this;
        _this.data = data;
        return _this;
    }
    SuccessResponse.prototype.send = function (res) {
        return _super.prototype.prepare.call(this, res, this);
    };
    return SuccessResponse;
}(ApiResponse));
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=ApiResponse.js.map