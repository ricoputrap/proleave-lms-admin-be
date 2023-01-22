import FeatureRepository from "../repository";
import { IFeature, IFeatureNew } from "../types";
import Service from "../../../core/Service";
import Repository from "../../../interfaces/repository";
import { ErrorResponse, SuccessResponse } from "../../../types/api.types";
import { STATUS_CODES } from "../../../constants/api.enum";
import { ServiceReturnType } from "../../../core/service.types";

class FeatureService extends Service {
  private repository: Repository<IFeature, IFeatureNew>;

  constructor() {
    super();
    this.repository = new FeatureRepository();
  }

  getRepository = (): FeatureRepository => {
    return this.repository;
  }

  /**
   * @todo adjust for paginations
   */
  getAllFeatures = async (): Promise<ServiceReturnType<IFeature>> => {
    try {
      const features: IFeature[] = await this.repository.getAll();
      return {
        success: {
          data: features,
          total: features.length
        }
      };
    }
    catch (error: any) {
      const message: string = !!error.message ? error.message : error;
      const errorResponse: ErrorResponse = {
        code: STATUS_CODES.INTERNAL_SERVER,
        name: "internal_server",
        message
      }

      return {
        error: errorResponse
      }
    }
  }

  addNewFeature = async (name: string): Promise<ServiceReturnType<IFeature>> => {
    try {
      // validate duplication -> repo.getSingle()
      const filter: any = { name };
      const exists: Boolean = await this.checkIfExist(
        this.repository.getSingle,
        filter
      );
      if (exists) {
        const message: string = `A featur with the same name "${name}" already exists.`;
        const errorResponse: ErrorResponse = {
          code: STATUS_CODES.BAD_REQUEST,
          name: "duplicate_item",
          message
        }
        return { error: errorResponse }
      }

      // no duplicate, call the creation method in the repo
      const newFeatureData: IFeatureNew = { name }
      const newFeature: IFeature = await this.repository.addNew(newFeatureData);

      // construct & return the service success response
      const result: SuccessResponse<IFeature> = {
        data: newFeature
      }
      return { success: result }
    }
    catch (error: any) {
      const message: string = !!error.message ? error.message : error;
      const errorResponse: ErrorResponse = {
        code: STATUS_CODES.INTERNAL_SERVER,
        name: "internal_server",
        message
      }

      return {
        error: errorResponse
      }
    }
  }

  // /**
  //  * Validate Duplication
  //  * =====================
  //  * Check if a feature with the same `name` already exists on DB
  //  * @param name the feature name
  //  * @param excludedID the ID of a feature that will be excluded from the validation
  //  * @returns success if not duplicate, error bad request otherwise.
  //  */
  // private async _validateDuplication(name: string, excludedID: string = ""): Promise<ReturnType> {
  //   try {
  //     // construct filter object 
  //     const filter: any = { name };

  //     // exclude the ID of current item
  //     if (!!excludedID)
  //       filter._id = { $ne: excludedID }

  //     // construct a success response obj
  //     let result: ReturnType = { success: true, code: STATUS_CODES.OK };

  //     // check if the item exists in DB
  //     const exists: boolean = await this.checkIfExist(
  //       this.repository.getSingleFeature,
  //       filter
  //     );

  //     // if not exist, return success response obj
  //     if (!exists) return result;

  //     // else, construct & return bad request response obj
  //     result = getBadRequestResponse(`A feature with the name ${name} already exists.`);
  //     return result;
  //   }
  //   catch (error: any) {
  //     return getInternalServerErrorResponse(error);
  //   }
  // }
}

export default FeatureService;