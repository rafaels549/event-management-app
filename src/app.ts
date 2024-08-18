import express, { Application } from "express";
import authRoutes from "./routes/authRoutes";
import { errorMiddleware } from "./middleware/error";
import "express-async-errors";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(errorMiddleware);
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/auth", authRoutes);
  }
}
export default new App().app;
