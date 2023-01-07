import { getSuccessResponse } from ".";
import { STATUS_CODES } from "../../constants/api.enum";
import { ReturnType } from "../../types/api.types";

describe("UTILS - getSuccessResponse()", () => {
  test("should return success response without data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: STATUS_CODES.OK
    };

    const response: ReturnType = getSuccessResponse();
    expect(response).toEqual(successResponse);
  });

  test("should return success response with data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: STATUS_CODES.OK,
      data: "something"
    };

    const response: ReturnType = getSuccessResponse("something");
    expect(response).toEqual(successResponse);
  });
});