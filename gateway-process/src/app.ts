import Logger from "./core/Logger";
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import { NotFoundError, ApiError, InternalError } from "./core/ApiError";
import { environment } from "./config";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

// Server
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Routes
app.use("/api", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === "development") {
      Logger.error(err);
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
