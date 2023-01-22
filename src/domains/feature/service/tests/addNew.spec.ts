import FeatureService from ".."
import { STATUS_CODES } from "../../../../constants/api.enum";
import { ServiceReturnType } from "../../../../core/service.types";
import { ErrorResponse } from "../../../../types/api.types";
import { IFeature, IFeatureNew } from "../../types";


describe("FeatureService - addNewFeature()", () => {
  let service: FeatureService;

  beforeAll(() => {
    service = new FeatureService();
  });

  // SUCCESS - RETURNS NEW FEATURE DATA OBJECT
  test("should returns a new feature data after sucessfully create a new feature", async () => {
    const newFeature: IFeatureNew = {
      name: "Feature New"
    }
    const noFeature: IFeature | null = null;

    // mock the getSingle() method in the repository to return null
    // because no feature with the same name already exists
    // (no duplication)
    jest.spyOn(service.getRepository(), "getSingle")
      .mockResolvedValue(noFeature);

    // mock the addNew() method in the repository to successfully create
    // a new feature and return the new feature data object
    const createdFeature: IFeature = {
      _id: "1",
      name: "Feature New"
    }
    jest.spyOn(service.getRepository(), "addNew").mockResolvedValue(createdFeature);

    // call the service method
    const result: ServiceReturnType<IFeature> = await service.addNewFeature(newFeature.name);

    // construct a success service return value
    const successResult: ServiceReturnType<IFeature> = {
      success: {
        data: createdFeature
      }
    }

    // evaluate
    expect(result).toEqual(successResult);
  });

  // ERROR - DUPLICATE FEATURE NAME
  test("should return error bad request when creating a new feature with the same name", async () => {
    const updatedFeature: IFeatureNew = {
      name: "Feature New"
    }
    const feature: IFeature = {
      _id: "1",
      name: "Feature New"
    }

    // mock the getSingle() method in the repository to return a feature data
    // with the same name as `updatedFeature` name
    jest.spyOn(service.getRepository(), "getSingle").mockResolvedValue(feature);

    // construct the bad request error response
    const message: string = `A featur with the same name "${updatedFeature.name}" already exists.`;
    const errorResponse: ErrorResponse = {
      code: STATUS_CODES.BAD_REQUEST,
      name: "duplicate_item",
      message
    }

    // call the service method
    const result: ServiceReturnType<IFeature> = await service.addNewFeature(updatedFeature.name);

    // evaluate
    expect(result).toEqual({ error: errorResponse });
  });

  // ERROR - INTERNAL SERVER on VALIDATE DUPLICATION
  test("should return error internal server when validating the duplication", async () => {
    // mock the getSingle() method in the repository to throw an error
    const error = new Error("Error when getting a single feature.");
    jest.spyOn(service.getRepository(), "getSingle").mockRejectedValue(error);

    // construct the internal server error response
    const errorResponse: ErrorResponse = {
      code: STATUS_CODES.INTERNAL_SERVER,
      name: "internal_server",
      message: error.message
    }

    // call the service method
    const newFeatureName: string = "Feature New";
    const result: ServiceReturnType<IFeature> = await service.addNewFeature(newFeatureName);

    // evalute
    expect(result).toEqual({ error: errorResponse });
  });

  // ERROR - INTERNAL SERVER on ADD NEW FEATURE in REPOSITORY
  test("should return error internal server when the exeuting addNew() method in repository", async () => {
    // mock the getSingle() method in the repository to return null
    // because no feature with the same name already exist
    jest.spyOn(service.getRepository(), "getSingle").mockResolvedValue(null);

    // mock the addNew() method in the repository to throw an error
    const error = new Error("Error when adding a new feature.");
    jest.spyOn(service.getRepository(), "addNew").mockRejectedValue(error);

    // construct the internal server error response
    const errorResponse: ErrorResponse = {
      code: STATUS_CODES.INTERNAL_SERVER,
      name: "internal_server",
      message: error.message
    }

    // call the service method
    const newFeatureName: string = "Feature New";
    const result: ServiceReturnType<IFeature> = await service.addNewFeature(newFeatureName);

    // evaluate
    expect(result).toEqual({ error: errorResponse });
  });
})