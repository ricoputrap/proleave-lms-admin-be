import { FeatureController, FeatureRouter, Test } from "../src/controllers";
import { TRoute } from "../src/types/config.types";

const routes: TRoute[] = [
  { path: "/test", router: Test() },
  { path: "/v1/features", router: FeatureRouter() }
]

export default routes;