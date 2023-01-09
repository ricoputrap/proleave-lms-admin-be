import { Express } from "express";
import request from "supertest";
import { createApp } from "../../..";
import FeatureModel from "../../../models/FeatureModel";
import { IFeature } from "../../../types/models.types";
import { STATUS_CODES } from "../../../constants/api.enum";
import { ReturnType } from "../../../types/api.types";

const PATH = "/v1/features"

describe("FeatureController - addNewFeature()", () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  // SUCCESS
  test("should return success created response after successfully add a new feature", async () => {
    const newFeatureName: string = "Feature New";
    const newFeature: IFeature = {
      _id: "1",
      name: newFeatureName
    }

    // mock the retrieval method of the model that will be called
    // to retrieve a feature in the DB with the same name
    // to always return null
    jest.spyOn(FeatureModel, "findOne").mockResolvedValue(null);

    // mock the creation function of the model to always
    // successfully create a new item with the same given data
    jest.spyOn(FeatureModel, "create").mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(newFeature);
      });
    });

    // call the creation method in the controller
    const response = await request(app).post(PATH).send({ name: newFeatureName });

    // validate response is not empty with the correct status code
    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(STATUS_CODES.CREATED);

    // extract the response body
    const result: ReturnType = response.body;

    // validate the response body
    expect(result.success).toBe(true);
    expect(result.code).toBe(STATUS_CODES.CREATED);
    expect(result.data).toEqual(newFeature);
  });

  // ERROR - BAD REQUEST - PARAM IS NOT VALID
  test("should return error bad request when the request body is not valid", async () => {
    // call the creation method without passing anything in the request body
    const response = await request(app).post(PATH).send({});

    // validate response is not empty with the correct status code
    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(STATUS_CODES.BAD_REQUEST);

    // extract the response body
    const result: ReturnType = response.body;

    // validate the response body
    expect(result.success).toBe(false);
    expect(result.code).toBe(STATUS_CODES.BAD_REQUEST);

    const errorMessage: string = "'name' should be provided and not empty in the request body.";
    expect(result.message).toEqual(errorMessage);
  });

  // ERROR - BAD REQUEST - DUPLICATE ITEM
  test("should return error bad request when the feature with the same name already exist", async () => {
    const newFeatureName: string = "Feature New";

    // mock the retrieval method of the model that will be called
    // to retrieve a feature by the name on the database
    // to always return a feature with the same name
    jest.spyOn(FeatureModel, "findOne").mockResolvedValue({
      _id: "1",
      name: newFeatureName
    });
    
    // call the creation method
    const response = await request(app).post(PATH).send({ name: newFeatureName });

    // validate response is not empty with the correct status code
    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(STATUS_CODES.BAD_REQUEST);

    // extract the response body
    const result: ReturnType = response.body;

    // validate the response body
    expect(result.success).toBe(false);
    expect(result.code).toBe(STATUS_CODES.BAD_REQUEST);

    const message: string = `A feature with the name ${newFeatureName} already exists.`;
    expect(result.message).toEqual(message);
  });

  // ERROR - UNAUTHORIZED - WITHOUT LOGIN

  // // ERROR - INTERNAL SERVER ERROR when VALIDATING DUPLICATION
  // test("should return internal server error when an unexpected error occurs when validating the duplication", async () => {
  //   const error = new Error("Error getting a single feature.");

  //   const controller = new FeatureController();
  //   app.use(controller.getRouter());

  //   jest.spyOn(controller.getService().getRepository(), "getSingleFeature").mockRejectedValue(error);

  //   // mock the retrieval method of the model that will be called
  //   // to retrieve a feature in the DB with the same name
  //   // to always return null
  //   // jest.spyOn(FeatureModel, "findOne").mockRejectedValue(error);

  //   // call the creation method
  //   const newFeatureName: string = "Feature New";
  //   const response = await request(app).post(PATH).send({ name: newFeatureName });

  //   // response is not empty with correct status code
  //   expect(response.body).toBeDefined();
  //   expect(response.statusCode).toBe(STATUS_CODES.INTERNAL_SERVER);

  //   // extract response body
  //   const result: ReturnType = response.body;

  //   // construct success response object
  //   const errorResponse: ReturnType = {
  //     success: false,
  //     code: STATUS_CODES.INTERNAL_SERVER,
  //     message: error.message
  //   }

  //   // validate the response body
  //   expect(result.success).toBe(errorResponse.success);
  //   expect(result.code).toBe(errorResponse.code);
  //   expect(result.message).toBe(errorResponse.message);
  // });

  // ERROR - INTERNAL SERVER ERROR when EXECUTE THE DATA CREATION
  test("should return internal server error when saving the new feature to the DB", async () => {
    const error = new Error("Internal server error when saving the new feature to the DB.");

    // mock the retrieval method of the model that will be called
    // to retrieve a feature in the DB with the same name
    // to always return null
    jest.spyOn(FeatureModel, "findOne").mockResolvedValue(null);

    // mock the creation function of the model to always throwing an error
    jest.spyOn(FeatureModel, "create").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    });

    // call the creation method
    const newFeatureName: string = "Feature New";
    const response = await request(app).post(PATH).send({ name: newFeatureName });

    // response is not empty with correct status code
    expect(response.body).toBeDefined();
    expect(response.statusCode).toBe(STATUS_CODES.INTERNAL_SERVER);

    // extract response body
    const result: ReturnType = response.body;

    // construct success response object
    const errorResponse: ReturnType = {
      success: false,
      code: STATUS_CODES.INTERNAL_SERVER,
      message: error.message
    }

    // validate the response body
    expect(result.success).toBe(errorResponse.success);
    expect(result.code).toBe(errorResponse.code);
    expect(result.message).toEqual(errorResponse.message);
  });
})