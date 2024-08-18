import express from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());

  app.get("/", (_, res) => {
    return res.json();
  });

  return app.listen(process.env.PORT);
});
