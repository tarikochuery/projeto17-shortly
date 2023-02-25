import { Router } from "express";
import authControllers from "../controllers/authControllers.js";

export const authRouter = Router();

authRouter.post('/signup', authControllers.signup);