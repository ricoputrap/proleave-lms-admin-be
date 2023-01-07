import { getUnauthorizedResponse } from ".";
import { STATUS_CODES } from "../../constants/api.enum";
import { ReturnType } from "../../types/api.types";

describe("UTILS - getUnauthorizedResponse()", () => {
  test("should return error unauthorized response with message", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: STATUS_CODES.UNAUTHORIZED,
      message: "unauthorized"
    };

    const response: ReturnType = getUnauthorizedResponse("unauthorized");
    expect(response).toEqual(errorResponse);
  });
});