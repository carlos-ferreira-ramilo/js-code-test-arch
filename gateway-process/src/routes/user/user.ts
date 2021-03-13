import express from "express";
import Logger from "../../core/Logger";
import validator, { ValidationSource } from "../../helpers/validator";
import schema from "./schema";
import { SuccessResponse } from "../../core/ApiResponse";
import UserService from "../../services/UserService";

const router = express.Router();
const userService = new UserService();

router.get(
  "/:id",
  validator(schema.userId, ValidationSource.PARAM),
  (req, res) => {
    Logger.info(`GET OK id: ${req.params.id}`);
    userService.getUser(req.params.id);
    return new SuccessResponse("success", req.params.id).send(res);
  }
);

router.post(
  "",
  validator(schema.userSchema, ValidationSource.BODY),
  (req, res) => {
    Logger.info(`POST OK`);
    userService.createUser(req.body);
    return new SuccessResponse("success", "OK").send(res);
  }
);

router.put(
  "",
  validator(schema.userSchema, ValidationSource.BODY),
  (req, res) => {
    Logger.info(`PUT OK`);
    userService.updateUser(req.body);
    return new SuccessResponse("success", "OK").send(res);
  }
);

router.delete(
  "/:id",
  validator(schema.userId, ValidationSource.PARAM),
  (req, res) => {
    Logger.info(`DELETE OK`);
    userService.deleteUser(req.body);
    return new SuccessResponse("success", "OK").send(res);
  }
);

export default router;
