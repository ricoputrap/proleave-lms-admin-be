import { getCreatedResponse } from ".";
import { STATUS_CODES } from "../../constants/api.enum";
import { ReturnType } from "../../types/api.types";

describe("UTILS - getCreatedResponse()", () => {
  test("should return success response without data after creating a new data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: STATUS_CODES.CREATED
    };

    const response: ReturnType = getCreatedResponse();
    expect(response).toEqual(successResponse);
  });

  test("should return success response with data after creating a new data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: STATUS_CODES.CREATED,
      data: "something"
    };

    const response: ReturnType = getCreatedResponse("something");
    expect(response).toEqual(successResponse);
  });
});