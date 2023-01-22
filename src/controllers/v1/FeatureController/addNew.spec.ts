import { Express } from "express";
import request from "supertest";
import { createApp } from "../../..";
import FeatureModel from "../../../domains/feature/model";
import { IFeature, IFeatureNew } from "../../../domains/feature/types";
import { STATUS_CODES } from "../../../constants/api.enum";
import { ErrorResponse, SuccessResponse } from "../../../types/api.types";

const PATH = "/v1/features";

describe("FeatureController - Add New Feature", () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  // SUCCESS - CREATED - RETURN THE NEW FEATURE DATA
  test("should return success created response after successfully add a new feature", async () => {
    const newFeatureName: string = "Feature New";
    const newFeature: IFeature = {
      _id: "1",
      name: "Feature New"
    }

    // construct success response object
    const successResponse: SuccessResponse<IFeature> = {
      data: newFeature
    }

    // mock the retrieval method in the model that will be called
    // for validating duplication to always return null
    jest.spyOn(FeatureModel, "findOne").mockResolvedValue(null);

    // mock the creation method in the model to always successfully
    // create a new item with the same given data
    jest.spyOn(FeatureModel, "create").mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(newFeature);
      });
    });

    // call the POST request
    const response = await request(app).post(PATH).send({ name: newFeatureName });

    // validate response is not empty with the correct status code
    expect(response.statusCode).toBe(STATUS_CODES.CREATED);
    expect(response.body).toBeDefined();

     // extract the response body
    const result: SuccessResponse<IFeature> = response.body;

    // validate the new feature data
    expect(result).toEqual(successResponse);
  });

  // ERROR - BAD REQUEST - INVALID PARAM
  test("should return error bad request when the request body is not valid", async () => {
    // construct error response object
    const errorMessage: string = "'name' should be provided and not empty in the request body.";
    const errorResponse: ErrorResponse = {
      code: STATUS_CODES.BAD_REQUEST,
      name: "invalid_param",
      message: errorMessage
    }

    // call the creation method without passing anything in the request body
    const response = await request(app).post(PATH).send({});

    // validate response is not empty with the correct status code
    expect(response.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
    expect(response.body).toBeDefined();

    // extract the response body
    const result: ErrorResponse = response.body;

    // validate the error response
    expect(result).toEqual(errorResponse);
  });

  // ERROR - BAD REQUEST - DUPLICATE ITEM
  test("should return error bad request when the feature with the same name already exist", async () => {
    const newFeatureName: string = "Feature New";

    // construct error response object
    const errorMessage: string = `A feature with the name '${newFeatureName}' already exists.`;
    const errorResponse: ErrorResponse = {
      code: STATUS_CODES.BAD_REQUEST,
      name: "duplicate_item",
      message: errorMessage
    }

    // mock the retrieval method in the model for validating duplication
    // to always return a feature with the same name
    jest.spyOn(FeatureModel, "findOne").mockResolvedValue({
      _id: "1",
      name: "New Feature"
    });

    // call the creation method
    const response = await request(app).post(PATH).send({ name: newFeatureName });

    // validate response is not empty with the correct status code
    expect(response.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
    expect(response.body).toBeDefined();

    // extract the response body
    const result: ErrorResponse = response.body;

     // validate the error response
     expect(result).toEqual(errorResponse);
  });

  // ERROR - UNAUTHORIZED - WITHOUT LOGIN

  // ERROR - INTERNAL SERVER - VALIDATING DUPLICATION

  // ERROR - INTERNAL SERVER - EXECUTE DATA CREATION
  test("should return internal server error when saving a new feature in the DB", async () => {
    const error = new Error("Internal server error when saving the new feature to the DB.");

    // construct error response object
    const errorResponse: ErrorResponse = {
      code: STATUS_CODES.INTERNAL_SERVER,
      name: "internal_server",
      message: error.message
    }

    // mock the retrieval method in the model for validating duplication
    // to always return null
    jest.spyOn(FeatureModel, "findOne").mockResolvedValue(null);

    // mock the creation method in the model to always throws an error
    jest.spyOn(FeatureModel, "create").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    });

    // call the creation method
    const newFeatureName: string = "Feature New";
    const response = await request(app).post(PATH).send({ name: newFeatureName });

    // validate response is not empty with the correct status code
    expect(response.statusCode).toBe(STATUS_CODES.INTERNAL_SERVER);
    expect(response.body).toBeDefined();
    
    // extract the response body
    const result: ErrorResponse = response.body;

    // validate the error response
    expect(result).toEqual(errorResponse);
  });
});