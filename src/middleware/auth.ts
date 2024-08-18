import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import userService from "../services/userService";
import { UnauthorizedError } from "../helpers/apiError";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "Login required.",
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const key = process.env.SECRET_KEY;

    if (!key) {
      throw new UnauthorizedError("Não autorizado.");
    }
    console.log(key);

    const data = jwt.verify(token, key) as { email: string };

    const { email } = data;
    if (!email) {
      throw new UnauthorizedError("Não autorizado.");
    }

    const user = await userService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Usuário não encontrado.");
    }

    next();
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: "Token inválido.",
      });
    }

    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Internal Server Error";

    return res.status(statusCode).json({ message });
  }
};
