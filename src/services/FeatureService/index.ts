import FeatureRepository from "../../repository/FeatureRepository";
import { ReturnType } from "../../types/api.types";
import { IFeature } from "../../types/models.types";
import { getInternalServerErrorResponse, getSuccessResponse } from "../../utils/responseConstructor";
import Service from "../Service";

class FeatureService extends Service {
  private repository: FeatureRepository;

  constructor() {
    super();
    this.repository = new FeatureRepository();
  }

  getRepository = (): FeatureRepository => {
    return this.repository;
  }

  getAllFeatures = async (): Promise<ReturnType> => {
    try {
      const features: IFeature[] = await this.repository.getAllFeatures();
      const result: ReturnType = getSuccessResponse(features);

      return result;
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
    }
  }
}

export default FeatureService;