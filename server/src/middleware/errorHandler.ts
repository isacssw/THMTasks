import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../utils/ApplicationError";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApplicationError) {
    return res.status(error.statusCode).json({
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
    });
  }
  return res.status(500).send({ message: "Internal Server Error" });
};

export default errorHandler;
