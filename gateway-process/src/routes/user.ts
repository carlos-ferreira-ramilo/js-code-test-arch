import express from "express";
import Logger from "../core/Logger";
import { SuccessResponse } from "../core/ApiResponse";

const router = express.Router();

router.get("/:id", (req, res) => {
  Logger.info(`GET OK id: ${req.params.id}`);
  return new SuccessResponse("success", req.params.id).send(res);
});

export default router;
