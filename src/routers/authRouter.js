import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import authSchemas from "../schemas/authSchemas.js";

export const authRouter = Router();

authRouter.post('/signup', validateSchema(authSchemas.signUpSchema), authControllers.signup);