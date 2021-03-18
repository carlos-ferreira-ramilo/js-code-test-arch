"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("./user/user"));
var router = express_1["default"].Router();
router.use("/user", user_1["default"]);
exports["default"] = router;
//# sourceMappingURL=index.js.map