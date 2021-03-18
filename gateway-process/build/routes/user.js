"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var Logger_1 = __importDefault(require("../core/Logger"));
var ApiResponse_1 = require("../core/ApiResponse");
var router = express_1["default"].Router();
router.get("/:id", function (req, res) {
    Logger_1["default"].info("GET OK id: " + req.params.id);
    return new ApiResponse_1.SuccessResponse("success", req.params.id).send(res);
});
router.post("", function (req, res) {
    Logger_1["default"].info("POST OK");
    return new ApiResponse_1.SuccessResponse("success", "OK").send(res);
});
router.put("", function (req, res) {
    Logger_1["default"].info("PUT OK");
    return new ApiResponse_1.SuccessResponse("success", "OK").send(res);
});
router["delete"]("/:id", function (req, res) {
    Logger_1["default"].info("DELETE OK");
    return new ApiResponse_1.SuccessResponse("success", "OK").send(res);
});
exports["default"] = router;
//# sourceMappingURL=user.js.map