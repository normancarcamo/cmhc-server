import express from "express";

import { methodNotAllowed } from "./middlewares";
import * as controller from "./controller";

const router = express.Router();

router
  .route("/ping")
  .get((req, res) => res.json(controller.ping()))
  .all(methodNotAllowed);

router
  .route("/calculate-mortgage")
  .post((req, res) => res.json(controller.calculateMortgage(req.body)))
  .all(methodNotAllowed);

export default router;
