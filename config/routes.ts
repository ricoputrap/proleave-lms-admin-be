import { Test } from "../src/controllers";
import { TRoute } from "../src/types/config.types";

const routes: TRoute[] = [
  { path: "/test", controller: Test() }
]

export default routes;