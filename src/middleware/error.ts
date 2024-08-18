import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ApiError } from "../helpers/apiError";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Error",
      errors: error.errors,
    });
  }

  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";

  return res.status(statusCode).json({ message });
};
