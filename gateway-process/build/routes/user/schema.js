"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("@hapi/joi"));
exports["default"] = {
    userId: joi_1["default"].object({
        id: joi_1["default"].string().required()
    }),
    userSchema: joi_1["default"].object({
        id: joi_1["default"].string().required(),
        name: joi_1["default"].string(),
        email: joi_1["default"].string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] }
        }),
        group: joi_1["default"].number().integer()
    })
};
//# sourceMappingURL=schema.js.map