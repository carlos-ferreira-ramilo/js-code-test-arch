import Logger from "./core/Logger";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

require("./app");
require("./socket");
