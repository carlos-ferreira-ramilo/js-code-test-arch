import express from "express";
import Logger from "../../core/Logger";
import validator, { ValidationSource } from "../../helpers/validator";
import schema from "./schema";
import { SuccessResponse, InternalErrorResponse } from "../../core/ApiResponse";
import UserService from "../../services/UserService";

const router = express.Router();
const userService = new UserService();

router.get(
  "/:id",
  validator(schema.userId, ValidationSource.PARAM),
  async (req, res) => {
    let result: any = await userService.getUser(req.params.id);
    if (result.success) {
      return new SuccessResponse("success", result.data).send(res);
    }
    return new InternalErrorResponse(result.err).send(res);
  }
);

router.post(
  "",
  validator(schema.userSchema, ValidationSource.BODY),
  async (req, res) => {
    let result: any = await userService.createUser(req.body);
    if (result.success) {
      return new SuccessResponse("success", result.data).send(res);
    }
    return new InternalErrorResponse(result.err).send(res);
  }
);

router.put(
  "",
  validator(schema.userSchema, ValidationSource.BODY),
  async (req, res) => {
    let result: any = await userService.updateUser(req.body);
    if (result.success) {
      return new SuccessResponse("success", result.data).send(res);
    }
    return new InternalErrorResponse(result.err).send(res);
  }
);

router.delete(
  "/:id",
  validator(schema.userId, ValidationSource.PARAM),
  async (req, res) => {
    let result: any = await userService.deleteUser(req.params.id);
    if (result.success) {
      return new SuccessResponse("success", result.data).send(res);
    }
    return new InternalErrorResponse(result.err).send(res);
  }
);

export default router;
