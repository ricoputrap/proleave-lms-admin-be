import { Request, Response, Router } from "express";
import FeatureService from "../../../services/FeatureService";
import { ReturnType } from "../../../types/api.types";

class FeatureController {
  private router: Router;
  private service: FeatureService;

  constructor() {
    this.router = Router();
    this.service = new FeatureService();
    this.init();
  }

  public getRouter(): Router {
    return this.router;
  }

  getAllFeatures = async (req: Request, res: Response) => {
    const result: ReturnType = await this.service.getAllFeatures();
    return res.status(result.code).json(result);
  }

  private async init() {
    this.router.get("/", await this.getAllFeatures);
  }
}

export const FeatureRouter = (): Router => {
  const controller: FeatureController = new FeatureController();
  return controller.getRouter();
}

export default FeatureController;