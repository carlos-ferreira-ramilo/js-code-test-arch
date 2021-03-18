"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Logger_1 = __importDefault(require("../core/Logger"));
var loadBalancer_1 = __importDefault(require("../helpers/loadBalancer"));
var socket_1 = __importDefault(require("../socket"));
var lodash_1 = __importDefault(require("lodash"));
var UserService = /** @class */ (function () {
    function UserService() {
    }
    /**
     * Get the user by Id
     * @param userId
     * @returns If the user exists return Response User promise with success true. Success false with err in case not exists.
     */
    UserService.prototype.getUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1["default"].debug("UserService.getUser " + userId);
                        return [4 /*yield*/, this.findUserInDbProcesses(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Create the user
     * @param user
     * @returns If the user exists return success false with err, else the user is created and returns success true.
     */
    UserService.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var findUserResult, instanceToEmit, createResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1["default"].debug("UserService.createUser " + JSON.stringify(user));
                        return [4 /*yield*/, this.findUserInDbProcesses(user.id)];
                    case 1:
                        findUserResult = _a.sent();
                        if (findUserResult.success) {
                            return [2 /*return*/, { success: false, err: "User already exists" }];
                        }
                        instanceToEmit = loadBalancer_1["default"].getInstanceToEmit(user.group);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                instanceToEmit.socket.emit("createUser", user, function (result) {
                                    return resolve(result);
                                });
                            })];
                    case 2:
                        createResult = _a.sent();
                        if (instanceToEmit.secondary) {
                            instanceToEmit.secondary.emit("createUserSecondary", user);
                        }
                        return [2 /*return*/, createResult];
                }
            });
        });
    };
    /**
     * Partial update of the user
     * @param user
     * @returns If the user exists update the user and success true. Success false with err in case not exists.
     */
    UserService.prototype.updateUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1["default"].debug("UserService.updateUser " + JSON.stringify(user));
                        return [4 /*yield*/, this.updateUserInDbProcesses(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Delete the user
     * @param userId
     * @returns success true but false in case of db error.
     */
    UserService.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Logger_1["default"].debug("UserService.deleteUser " + userId);
                        return [4 /*yield*/, this.deleteUserInDbProcesses(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.findUserInDbProcesses = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var socket;
            var sendEvent;
            var idxBackup;
            var idxSocketsSend = 0;
            var idxSocketsResp = 0;
            for (var idx in socket_1["default"]) {
                if (socket_1["default"][idx].secondary &&
                    _this.isSocketUp(socket_1["default"][idx].secondary)) {
                    socket = socket_1["default"][idx].secondary;
                    sendEvent = "getUserSecondary";
                }
                else {
                    socket = socket_1["default"][idx].socket;
                    sendEvent = "getUser";
                }
                idxSocketsSend++;
                socket.emit(sendEvent, userId, function (result) {
                    if (result.success) {
                        return resolve(result);
                    }
                    idxSocketsResp++;
                    if (idxSocketsResp === idxSocketsSend) {
                        return resolve(result);
                    }
                });
            }
        });
    };
    UserService.prototype.updateUserInDbProcesses = function (user) {
        return new Promise(function (resolve, reject) {
            var idxSocketsSend = 0;
            var idxSocketsResp = 0;
            for (var idx in socket_1["default"]) {
                if (socket_1["default"][idx].secondary) {
                    socket_1["default"][idx].socket.emit("updateUserSecondary", user);
                }
                idxSocketsSend++;
                socket_1["default"][idx].socket.emit("updateUser", user, function (result) {
                    if (result.success) {
                        return resolve(result);
                    }
                    idxSocketsResp++;
                    if (idxSocketsResp === idxSocketsSend) {
                        return resolve(result);
                    }
                });
            }
        });
    };
    UserService.prototype.deleteUserInDbProcesses = function (userId) {
        return new Promise(function (resolve, reject) {
            var idxSocketsSend = 0;
            var idxSocketsResp = 0;
            for (var idx in socket_1["default"]) {
                if (socket_1["default"][idx].secondary) {
                    socket_1["default"][idx].socket.emit("deleteUserSecondary", userId);
                }
                idxSocketsSend++;
                socket_1["default"][idx].socket.emit("deleteUser", userId, function (result) {
                    if (result.success) {
                        return resolve(result);
                    }
                    idxSocketsResp++;
                    if (idxSocketsResp === idxSocketsSend) {
                        return resolve(result);
                    }
                });
            }
        });
    };
    UserService.prototype.isSocketUp = function (socket) {
        var dbInstance = lodash_1["default"].find(socket_1["default"], function (itemDbInstance) { return itemDbInstance.socket === socket; });
        if (dbInstance) {
            return dbInstance.up;
        }
        return false;
    };
    return UserService;
}());
exports["default"] = UserService;
//# sourceMappingURL=UserService.js.map