import { NextFunction, Request, Response } from "express";
import { userInsertSchema, userLoginSchema } from "../dtos/userDtos";
import authService from "../services/authService";
import { ZodError } from "zod";

export class AuthController {
  async register(req: Request, res: Response) {
    const body = req.body;
    try {
      const payload = userInsertSchema.parse(body);
      const user = await authService.register(payload);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(error);
      }
      return res.status(500).json(error);
    }
  }

  async login(req: Request, res: Response) {
    const body = req.body;
    try {
      const payload = userLoginSchema.parse(body);
      const response = await authService.login(payload);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation Error",
          errors: error.errors,
        });
      }
      return res.status(500).json(error);
    }
  }
}
