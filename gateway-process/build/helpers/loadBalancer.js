"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var socket_1 = __importDefault(require("../socket"));
var LoadBalancer = /** @class */ (function () {
    function LoadBalancer() {
    }
    /**
     * Gets the socket to emit according the group of the user
     * @param group
     * @returns
     */
    LoadBalancer.getSocketToEmit = function (group) {
        return LoadBalancer.getInstanceToEmit(group).socket;
    };
    /**
     *
     * @param group Gets the db instance according the group of the user
     * @returns
     */
    LoadBalancer.getInstanceToEmit = function (group) {
        return socket_1["default"][group % socket_1["default"].length];
    };
    return LoadBalancer;
}());
exports["default"] = LoadBalancer;
//# sourceMappingURL=loadBalancer.js.map