import express from "express";
import Logger from "../core/Logger";
import { SuccessResponse } from "../core/ApiResponse";

const router = express.Router();

router.get("/:id", (req, res) => {
  Logger.info(`GET OK id: ${req.params.id}`);
  return new SuccessResponse("success", req.params.id).send(res);
});

router.post("", (req, res) => {
  Logger.info(`POST OK`);
  return new SuccessResponse("success", "OK").send(res);
});

router.put("", (req, res) => {
  Logger.info(`PUT OK`);
  return new SuccessResponse("success", "OK").send(res);
});

router.delete("/:id", (req, res) => {
  Logger.info(`DELETE OK`);
  return new SuccessResponse("success", "OK").send(res);
});
export default router;
