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
var level_rocksdb_1 = __importDefault(require("level-rocksdb"));
var User_1 = __importDefault(require("../types/User"));
var Response_1 = __importDefault(require("../types/Response"));
var UserRepo = /** @class */ (function () {
    function UserRepo(primary) {
        if (primary === void 0) { primary = true; }
        this.primary = primary;
        if (this.primary) {
            this.db = level_rocksdb_1["default"]("./dbprimary");
        }
        else {
            this.db = level_rocksdb_1["default"]("./dbsecondary");
        }
    }
    /**
     * Find the user by Id
     * @param userId
     * @returns If the user exists return Response User promise with success true. Success false with err in case not exists.
     */
    UserRepo.prototype.findById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.get(userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, new Response_1["default"](true, new User_1["default"](JSON.parse(user)), undefined)];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, new Response_1["default"](false, undefined, err_1.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create the user
     * @param user
     * @returns If the user exists return success false with err, else the user is created and returns success true.
     */
    UserRepo.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findById(user.id)];
                    case 1:
                        if (!((_a.sent()).success === false)) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.db.put(user.id, JSON.stringify(user))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, new Response_1["default"](true, undefined, undefined)];
                    case 4:
                        err_2 = _a.sent();
                        return [2 /*return*/, new Response_1["default"](false, undefined, err_2.message)];
                    case 5: return [2 /*return*/, new Response_1["default"](false, undefined, "User already exists")];
                }
            });
        });
    };
    /**
     * Partial update of the user
     * @param user
     * @returns If the user exists update the user and success true. Success false with err in case not exists.
     */
    UserRepo.prototype.update = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var resultFind, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findById(user.id)];
                    case 1:
                        if (!((resultFind = _a.sent()).success === true)) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.db.put(user.id, JSON.stringify(resultFind.data.update(user)))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, new Response_1["default"](true, undefined, undefined)];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, new Response_1["default"](false, undefined, err_3.message)];
                    case 5: return [2 /*return*/, new Response_1["default"](false, undefined, "User does not exist")];
                }
            });
        });
    };
    /**
     * Delete the user
     * @param userId
     * @returns success true but false in case of db error.
     */
    UserRepo.prototype["delete"] = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.del(userId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Response_1["default"](true, undefined, undefined)];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, new Response_1["default"](false, undefined, err_4.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserRepo;
}());
exports["default"] = UserRepo;
//# sourceMappingURL=UserRepo.js.map