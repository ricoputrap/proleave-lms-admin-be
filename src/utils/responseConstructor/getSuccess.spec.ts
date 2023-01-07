import { getCreatedResponse, getSuccessResponse } from ".";
import { STATUS_CODES } from "../../constants/api.enum";
import { ReturnType } from "../../types/api.types";

const {
  OK,
  CREATED
} = STATUS_CODES;

describe("UTILS - getSuccessResponse()", () => {
  test("should return success response without data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: OK
    };

    const response: ReturnType = getSuccessResponse();
    expect(response).toEqual(successResponse);
  });

  test("should return success response with data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: OK,
      data: "something"
    };

    const response: ReturnType = getSuccessResponse("something");
    expect(response).toEqual(successResponse);
  });

  test("should return success response without data after creating a new data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: CREATED
    };

    const response: ReturnType = getCreatedResponse();
    expect(response).toEqual(successResponse);
  });

  test("should return success response with data after creating a new data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: CREATED,
      data: "something"
    };

    const response: ReturnType = getCreatedResponse("something");
    expect(response).toEqual(successResponse);
  });
});