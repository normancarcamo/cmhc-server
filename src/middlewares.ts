import { CustomError, ErrorInfo } from "./error";
import { logger } from "./logger";

import type { ErrorRequestHandler, RequestHandler } from "express";

export const methodNotAllowed: RequestHandler = (req, res) => {
  throw CustomError.handle(ErrorInfo.METHOD_NOT_ALLOWED);
};

export const resourceNotFound: RequestHandler = (req, res) => {
  throw CustomError.handle(ErrorInfo.NOT_FOUND);
};

export const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
  const payload = { success: false, message: err.message, ...err };
  logger.error(payload, err.message);
  res.status(err.status || 500).json(payload);
};
