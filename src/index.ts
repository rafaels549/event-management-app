import { AppDataSource } from "./data-source";
import app from "./app";
import "dotenv/config";

AppDataSource.initialize().then(() => {
  return app.listen(process.env.PORT);
});
