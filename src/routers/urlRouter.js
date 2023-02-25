import { Router } from "express";
import urlController from "../controllers/urlsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import urlSchemas from "../schemas/urlSchemas.js";

export const urlRouter = Router();

urlRouter.post(
  '/urls/shorten',
  validateToken,
  validateSchema(urlSchemas.shorten),
  urlController.shorten
);
urlRouter.get('/urls/:id', urlController.getShortUrlById);