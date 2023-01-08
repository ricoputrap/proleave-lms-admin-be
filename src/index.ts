import express, { Express } from "express";
import { startConfiguration } from "../config";
import { PORT } from "../config/env";
import connectRoutes from "./utils/connectRoutes";

export const createApp = (): Express => {
  const app: Express = express();

  // middlewares
  app.use(express.json());

  // connect all routes
  connectRoutes(app);

  return app;
}

const startServer = () => {
  const app: Express = createApp();

  // listen to connection on the configured port
  app.listen(PORT, () => {
    console.log(`SERVER STARTS on PORT ${PORT}`);
  })
}

startConfiguration().then(() => {
  startServer();
})