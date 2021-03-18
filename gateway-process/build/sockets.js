"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var io = require("socket.io")(config_1.socketPort);
io.on("connection", function (socket) {
    socket.send("Hello!");
});
//# sourceMappingURL=sockets.js.map