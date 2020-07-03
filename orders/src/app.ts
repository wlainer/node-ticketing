import express from "express";
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {json} from "body-parser";

import {currentUser, errorHandler, NotFoundError} from "@wnr-org/common";
import {insertOrdersRoute} from "./routes/new";
import {showOrdersRoute} from "./routes/show";
import {indexOrdersRouter} from "./routes";
import {updateOrdersRouter} from "./routes/update";
import {deleteOrdersRouter} from "./routes/delete";


const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);

app.use(insertOrdersRoute);
app.use(showOrdersRoute);
app.use(indexOrdersRouter);
app.use(updateOrdersRouter);
app.use(deleteOrdersRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};
