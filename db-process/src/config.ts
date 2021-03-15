export const environment = process.env.NODE_ENV || "development";

export const logDirectory = process.env.LOG_DIR || "logs";

export const socketServerURL =
  process.env.SOCKET_SERVER_URL || "ws://localhost:3002";

export const dbInstanceId = process.env.DB_INSTANCE_ID || "db-0";
