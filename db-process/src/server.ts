import Logger from "./core/Logger";

Logger.info(`db-process init.`);

process.on("uncaughtException", (e) => {
  Logger.error(e);
});
