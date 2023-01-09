import { Request, Response, Router } from "express";
import FeatureService from "../../../services/FeatureService";
import { ReturnType } from "../../../types/api.types";
import { getBadRequestResponse } from "../../../utils/responseConstructor";

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

  public getService(): FeatureService {
    return this.service;
  }

  getAllFeatures = async (req: Request, res: Response) => {
    const result: ReturnType = await this.service.getAllFeatures();
    return res.status(result.code).json(result);
  }

  addNewFeature = async (req: Request, res: Response) => {
    // 1. validate input - if "name" is provided in the request body
    const { name } = req.body;
    if (!name) {
      const errorMessage: string = "'name' should be provided and not empty in the request body.";
      const result: ReturnType = getBadRequestResponse(errorMessage);
      return res.status(result.code).json(result);
    }

    // 2. call service method
    const result: ReturnType = await this.service.addNewFeature(name);
    return res.status(result.code).json(result);
  }

  private async init() {
    this.router.get("/", await this.getAllFeatures);
    this.router.post("/", await this.addNewFeature);
  }
}

export const FeatureRouter = (): Router => {
  const controller: FeatureController = new FeatureController();
  return controller.getRouter();
}

export default FeatureController;