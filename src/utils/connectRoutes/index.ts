import { Express } from "express";
import routes from "../../../config/routes";
import { TRoute } from "../../types/config.types";

const connectRoutes = (app: Express) => {
  routes.forEach((route: TRoute) => {
    app.use(route.path, route.controller);
  })
}

export default connectRoutes;