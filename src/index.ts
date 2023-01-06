import express, { Express } from "express";
import { startConfiguration } from "../config";
import { PORT } from "../config/env";
import connectRoutes from "./utils/connectRoutes";

const startServer = () => {
  const app: Express = express();

  // middlewares
  app.use(express.json());

  // connect all routes
  connectRoutes(app);

  // listen to connection on the configured port
  app.listen(PORT, () => {
    console.log(`SERVER STARTS on PORT ${PORT}`);
  })
}

startConfiguration().then(() => {
  startServer();
})