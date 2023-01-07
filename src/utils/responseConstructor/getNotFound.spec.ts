import { getNotFoundResponse } from ".";
import { STATUS_CODES } from "../../constants/api.enum";
import { ReturnType } from "../../types/api.types";

describe("UTILS - getNotFoundResponse()", () => {
  test("should return error not found response with message", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: STATUS_CODES.NOT_FOUND,
      message: "not found"
    };

    const response: ReturnType = getNotFoundResponse("not found");
    expect(response).toEqual(errorResponse);
  });
});