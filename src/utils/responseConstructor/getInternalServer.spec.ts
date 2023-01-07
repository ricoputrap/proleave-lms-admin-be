import { getInternalServerErrorResponse } from ".";
import { STATUS_CODES } from "../../constants/api.enum";
import { ReturnType } from "../../types/api.types";

describe("UTILS - getInternalServerErrorResponse()", () => {
  test("should return error internal server response with message", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: STATUS_CODES.INTERNAL_SERVER,
      message: "internal server"
    };

    const response: ReturnType = getInternalServerErrorResponse("internal server");
    expect(response).toEqual(errorResponse);
  });
});