import { Express } from "express";
import request from "supertest";
import FeatureModel from "../../../models/FeatureModel";
import { ReturnType } from "../../../types/api.types";
import { STATUS_CODES } from "../../../constants/api.enum";
import { createApp } from "../../..";
import { IFeature } from "../../../types/models.types";

describe("FeatureController - getAllFeatures()", () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  // SUCCESS - no feature
  test("should return success with no feature being returned", async () => {
    // mock the retrieval method in db model to always return empty array of features
    jest.spyOn(FeatureModel, "find").mockResolvedValue([]);

    // construct success response object
    const successResponse: ReturnType = {
      success: true,
      code: STATUS_CODES.OK,
      data: []
    }

    // call the retrieval method in the controller
    const response = await request(app).get("/v1/features");

    // response is not empty with correct status code
    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(STATUS_CODES.OK);

    // extract response body
    const result: ReturnType = response.body;

    // validate the response body
    expect(result.success).toBe(successResponse.success);
    expect(result.code).toBe(successResponse.code);
    expect(result.data).toEqual(successResponse.data);
  });

  // SUCCESS - some features
  test("should return success with some features being returned", async () => {
    const features: IFeature[] = [
      { _id: "1", name: "Feature 1" },
      { _id: "2", name: "Feature 2" },
      { _id: "3", name: "Feature 3" }
    ]

    // mock the retrieval method in db model to always return array of features
    jest.spyOn(FeatureModel, "find").mockResolvedValue(features);

    // construct success response object
    const successResponse: ReturnType = {
      success: true,
      code: STATUS_CODES.OK,
      data: features
    }

    // call the retrieval method in the controller
    const response = await request(app).get("/v1/features");

    // response is not empty with correct status code
    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(STATUS_CODES.OK);

    // extract response body
    const result: ReturnType = response.body;

    // validate the response body
    expect(result.success).toBe(successResponse.success);
    expect(result.code).toBe(successResponse.code);
    expect(result.data).toEqual(successResponse.data);
  });

  // ERROR - internal server error
  test("should return internal server error", async () => {
    const error = new Error("Error when trying to retrieve all features");

    // mock the retrieval method in db model to always return array of features
    jest.spyOn(FeatureModel, "find").mockRejectedValue(error);

    // construct success response object
    const errorResponse: ReturnType = {
      success: false,
      code: STATUS_CODES.INTERNAL_SERVER,
      message: error.message
    }

    // call the retrieval method in the controller
    const response = await request(app).get("/v1/features");

    // response is not empty with correct status code
    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(STATUS_CODES.INTERNAL_SERVER);

    // extract response body
    const result: ReturnType = response.body;

    // validate the response body
    expect(result.success).toBe(errorResponse.success);
    expect(result.code).toBe(errorResponse.code);
    expect(result.data).toEqual(errorResponse.data);
  });
})