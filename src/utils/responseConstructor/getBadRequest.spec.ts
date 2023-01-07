import { getBadRequestResponse } from ".";
import { STATUS_CODES } from "../../constants/api.enum";
import { ReturnType } from "../../types/api.types";

describe("UTILS - getBadRequestResponse()", () => {
  test("should return error bad request response with message", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: STATUS_CODES.BAD_REQUEST,
      message: "bad request"
    };

    const response: ReturnType = getBadRequestResponse("bad request");
    expect(response).toEqual(errorResponse);
  });
});