import { Router } from "express";
import { AuthController } from "../controllers/authController";

const routes = Router();

routes.post("/register", new AuthController().register);
routes.post("/login", new AuthController().login);

export default routes;
