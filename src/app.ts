import express from "express";
import logger from "morgan";
import cors from "cors";

import routes from "./router";

import * as middlewares from "./middlewares";
import { origin } from "./constants";

const app = express();

app.use(logger("tiny"));
app.use(cors({ origin }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", routes);
app.use(middlewares.resourceNotFound);
app.use(middlewares.handleErrors);

export default app;
