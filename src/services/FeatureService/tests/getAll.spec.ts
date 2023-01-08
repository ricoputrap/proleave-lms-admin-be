import FeatureService from "..";
import { STATUS_CODES } from "../../../constants/api.enum";
import { ReturnType } from "../../../types/api.types";
import { IFeature } from "../../../types/models.types";

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
    jest.spyOn(service.getRepository(), "getAllFeatures").mockResolvedValue(features);
    
    const successResponse: ReturnType = {
      success: true,
      code: STATUS_CODES.OK,
      data: features
    }
    
    const response: ReturnType = await service.getAllFeatures();
    expect(response).toEqual(successResponse);
  });

  test("should throw error message when retrieving all features", async () => {
    const error = new Error("Error retrieving all features");

    jest.spyOn(service.getRepository(), "getAllFeatures").mockRejectedValue(error);

    const errorResponse: ReturnType = {
      success: false,
      code: STATUS_CODES.INTERNAL_SERVER,
      message: error.message
    }

    const response: ReturnType = await service.getAllFeatures();
    expect(response).toEqual(errorResponse);
  })
})