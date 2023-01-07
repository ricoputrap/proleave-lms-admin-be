import { getSuccessResponse } from ".";
import { STATUS_CODES } from "../../constants/api.enum";
import { ReturnType } from "../../types/api.types";

const {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER
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
});