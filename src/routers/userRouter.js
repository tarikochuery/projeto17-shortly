import { Router } from "express";
import usersController from "../controllers/usersController.js";
import { validateToken } from "../middlewares/validateToken.js";

export const userRouter = Router();

userRouter.get('/users/me', validateToken, usersController.getUser);
userRouter.get('/ranking', usersController.getRanking);