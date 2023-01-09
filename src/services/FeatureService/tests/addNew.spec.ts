import FeatureService from ".."
import { STATUS_CODES } from "../../../constants/api.enum";
import { ReturnType } from "../../../types/api.types";
import { IFeature } from "../../../types/models.types";

describe("FeatureService - addNewFeature()", () => {
  let service: FeatureService;

  beforeAll(() => {
    service = new FeatureService();
  });

  // SUCCESS WITH NO DUPLICATION
  test("should return success response after creating a new feature", async () => {
    const newFeatureName: string = "Feature New";
    const noFeature: IFeature | null = null;

    // mock the retrieval method in the repository to return null
    // because no feature with the same name already exists in DB
    jest.spyOn(service.getRepository(), "getSingleFeature")
      .mockResolvedValue(noFeature);

    // mock the creation method in the repository to return a success result
    // containing a feature data same as the expected feature
    const newFeature: IFeature = {
      _id: "1",
      name: "Feature 001"
    };
    jest.spyOn(service.getRepository(), "addNewFeature").mockResolvedValue(newFeature);

    // construct success response object
    const successResponse: ReturnType = {
      success: true,
      code: STATUS_CODES.CREATED,
      data: newFeature
    }

    // call a repository method to execute the creation
    const result: ReturnType = await service.addNewFeature(newFeatureName);

    // evaluate
    expect(result).toEqual(successResponse);
  });

  // ERROR WITH DUPLICATION
  test("should return error bad request when creating a new feature with the same name", async () => {
    const newFeatureName: string = "Feature New";
    const feature: IFeature = {
      _id: "1",
      name: newFeatureName
    }

    // mock the retrieval method in the repository to return a feature data
    // with the same name as the new feature
    jest.spyOn(service.getRepository(), "getSingleFeature")
      .mockResolvedValue(feature);

    // construct the error bad request response object
    const message: string = `A feature with the name ${newFeatureName} already exists.`;
    const errorResponse: ReturnType = {
      success: false,
      code: STATUS_CODES.BAD_REQUEST,
      message
    }

    // call a repository method to execute the creation
    const result: ReturnType = await service.addNewFeature(newFeatureName);

    // evaluate
    expect(result).toEqual(errorResponse);
  });

  // ERROR INTERNAL SERVER on VALIDATE DUPLICATION
  test("should return error internal server when validating the duplication and unexpected error happens", async () => {

    // mock the retrieval method in the repository to throw an error
    const error = new Error("Error when getting a single feature.");
    jest.spyOn(service.getRepository(), "getSingleFeature").mockRejectedValue(error);

    // construct the error internal server response obj
    const errorResponse: ReturnType = {
      success: false,
      code: STATUS_CODES.INTERNAL_SERVER,
      message: error.message
    }

    // call the service method
    const newFeatureName: string = "Feature New";
    const result: ReturnType = await service.addNewFeature(newFeatureName);

    // evaluate
    expect(result).toEqual(errorResponse);
  });

  // ERROR INTERNAL SERVER on ADD NEW FEATURE in REPOSITORY
  const testErrorAddNewFeatureName = "should return error internal server "
    + "when an error occurs on the execution of the creation method "
    + "in the repository";
  test(testErrorAddNewFeatureName, async () => {

    // mock the retrieval method in the repository to return null
    // because no feature with the same name already exists in DB
    jest.spyOn(service.getRepository(), "getSingleFeature")
    .mockResolvedValue(null);
    
    // mock the creation method in the repository to throw an error
    const error = new Error("Error when adding a new feature.");
    jest.spyOn(service.getRepository(), "addNewFeature").mockRejectedValue(error);

    // construct the error internal server response object
    const errorResponse: ReturnType = {
      success: false,
      code: STATUS_CODES.INTERNAL_SERVER,
      message: error.message
    }

    // call the service method
    const newFeatureName: string = "Feature New";
    const result: ReturnType = await service.addNewFeature(newFeatureName);

    // evaluate
    expect(result).toEqual(errorResponse);
  });
})