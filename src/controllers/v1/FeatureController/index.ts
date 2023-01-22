import { Request, Response, Router } from "express";
import { IFeature } from "../../../domains/feature/types";
import { ErrorResponse, SuccessResponse } from "../../../types/api.types";
import { STATUS_CODES } from "../../../constants/api.enum";
import { ServiceReturnType, SuccessReturnType } from "../../../core/service.types";
import FeatureService from "../../../domains/feature/service";

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
    const result: ServiceReturnType<IFeature> = await this.service.getAllFeatures();
    
    if (!!result.error) {
      const error: ErrorResponse = result.error;
      return res.status(error.code).json(error);
    }

    // construct success response object
    if (!!result.success) {
      const successReturnValue: SuccessReturnType<IFeature> = result.success;
      const response: SuccessResponse<IFeature> = {
        data: successReturnValue.data
      }
  
      return res.status(STATUS_CODES.OK).json(response);
    }
  }

  addNewFeature = async (req: Request, res: Response) => {
    // 1. validate input - if "name" is provided in the request body
    const { name } = req.body;
    if (!name) {
      const errorMessage: string = "'name' should be provided and not empty in the request body.";
      const errorResponse: ErrorResponse = {
        code: STATUS_CODES.BAD_REQUEST,
        name: "invalid_param",
        message: errorMessage
      }
      return res.status(errorResponse.code).json(errorResponse);
    }

    // 2. call service method
    const result: ServiceReturnType<IFeature> = await this.service.addNewFeature(name);
   
    if (!!result.error) {
      const error: ErrorResponse = result.error;
      return res.status(error.code).json(error);
    }

    if (!!result.success) {
      const successReturnValue: SuccessReturnType<IFeature> = result.success;
      const response: SuccessResponse<IFeature> = {
        data: successReturnValue.data
      }
      return res.status(STATUS_CODES.CREATED).json(response);
    }
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