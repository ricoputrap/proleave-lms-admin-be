import { STATUS_CODES } from "../../constants/api.enum";
import FeatureRepository from "../../repository/FeatureRepository";
import { ReturnType } from "../../types/api.types";
import { IFeature } from "../../types/models.types";
import { getBadRequestResponse, getCreatedResponse, getInternalServerErrorResponse, getSuccessResponse } from "../../utils/responseConstructor";
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

  addNewFeature = async (name: string): Promise<ReturnType> => {
    try {
      // validate duplication -> getFeatureByName
      const duplicateCheckResult: ReturnType = await this._validateDuplication(name);
      if (!duplicateCheckResult.success)
        return duplicateCheckResult;

      // call repo method
      const newFeature: IFeature = await this.repository.addNewFeature(name);
      
      // construct & return creation success response
      const result: ReturnType = getCreatedResponse(newFeature);
      return result;
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
    }
  }

  /**
   * Validate Duplication
   * =====================
   * Check if a feature with the same `name` already exists on DB
   * @param name the feature name
   * @param excludedID the ID of a feature that will be excluded from the validation
   * @returns success if not duplicate, error bad request otherwise.
   */
  private async _validateDuplication(name: string, excludedID: string = ""): Promise<ReturnType> {
    try {
      // construct filter object 
      const filter: any = { name };

      // exclude the ID of current item
      if (!!excludedID)
        filter._id = { $ne: excludedID }

      // construct a success response obj
      let result: ReturnType = { success: true, code: STATUS_CODES.OK };

      // check if the item exists in DB
      const exists: boolean = await this.checkIfExist(
        this.repository.getSingleFeature,
        filter
      );

      // if not exist, return success response obj
      if (!exists) return result;

      // else, construct & return bad request response obj
      result = getBadRequestResponse(`A feature with the name ${name} already exists.`);
      return result;
    }
    catch (error: any) {
      return getInternalServerErrorResponse(error);
    }
  }
}

export default FeatureService;