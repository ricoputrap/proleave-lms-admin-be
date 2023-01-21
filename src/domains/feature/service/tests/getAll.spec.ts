import FeatureService from ".."
import { STATUS_CODES } from "../../../../constants/api.enum";
import { ServiceReturnType, SuccessReturnType } from "../../../../core/service.types";
import { ErrorResponse } from "../../../../types/api.types";
import { IFeature } from "../../types";

describe("FeatureService - getAllFeatures()", () => {
  let service: FeatureService;

  beforeAll(() => {
    service = new FeatureService();
  });

  test("should return success response containing array of features", async () => {
    const features: IFeature[] = [
      { _id: "1", name: "Feature 1" },
      { _id: "2", name: "Feature 2" },
      { _id: "3", name: "Feature 3" },
    ];
    jest.spyOn(service.getRepository(), "getAll").mockResolvedValue(features);
    
    const response: ServiceReturnType<IFeature> = await service.getAllFeatures();
    const successResponse: SuccessReturnType<IFeature> = {
      data: features,
      total: features.length
    }

    expect(response).toEqual({ success: successResponse});
  });

  test("should throw error message when retrieving all features", async () => {
    const error = new Error("Error retrieving all features");
    jest.spyOn(service.getRepository(), "getAll").mockRejectedValue(error);

    const response = await service.getAllFeatures();
    const errorResponses: ErrorResponse = {
      code: STATUS_CODES.INTERNAL_SERVER,
      name: "internal_server",
      message: error.message
    };

    expect(response).toEqual({ error: errorResponses });
  });
})