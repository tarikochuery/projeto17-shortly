import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from './routers/authRouter.js';
import { urlRouter } from './routers/urlRouter.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use([authRouter, urlRouter]);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});