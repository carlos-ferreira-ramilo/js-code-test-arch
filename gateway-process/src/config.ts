export const environment = process.env.NODE_ENV || "development";

export const logDirectory = process.env.LOG_DIR || "logs";

export const restPort = process.env.REST_PORT || 3001;
export const socketPort = Number(process.env.SOCKET_PORT) || 3002;
