import { responseConstructor } from ".";
import { STATUS_CODES } from "../../constants/api.enum"
import { ReturnType } from "../../types/api.types"

const {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER
} = STATUS_CODES;

describe("UTILS - responseContructor()", () => {
  test("should return success response without data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: OK
    };

    const response: ReturnType = responseConstructor(OK);
    expect(response).toEqual(successResponse);
  });

  test("should return success response with data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: OK,
      data: "something"
    };

    const response: ReturnType = responseConstructor(OK, "", "something");
    expect(response).toEqual(successResponse);
  });

  test("should return success response with data after creating a new data", () => {
    const successResponse: ReturnType = {
      success: true,
      code: CREATED,
      data: {
        _id: "1",
        name: "something"
      }
    }

    const response: ReturnType = responseConstructor(CREATED, "", {
      _id: "1",
      name: "something"
    });

    expect(response).toEqual(successResponse);
  });

  // ERROR - 400 BAD REQUEST
  test("should return error response bad request", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: BAD_REQUEST,
      message: "bad request"
    }

    const response: ReturnType = responseConstructor(BAD_REQUEST, "bad request");
    expect(response).toEqual(errorResponse);
  });

  test("should return error response bad request with error object", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: BAD_REQUEST,
      message: "bad request"
    }

    const error = new Error("bad request");
    const response: ReturnType = responseConstructor(BAD_REQUEST, error);
    expect(response).toEqual(errorResponse);
  });

  // ERROR - 403 UNAUTHORIZED
  test("should return error response unauthorized", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: UNAUTHORIZED,
      message: "unauthorized"
    }

    const response: ReturnType = responseConstructor(UNAUTHORIZED, "unauthorized");
    expect(response).toEqual(errorResponse);
  });

  test("should return error response unauthorized with error object", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: UNAUTHORIZED,
      message: "unauthorized"
    }

    const error = new Error("unauthorized");
    const response: ReturnType = responseConstructor(UNAUTHORIZED, error);
    expect(response).toEqual(errorResponse);
  });

  // ERROR - 404 NOT FOUND
  test("should return error response not found", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: NOT_FOUND,
      message: "not found"
    }

    const response: ReturnType = responseConstructor(NOT_FOUND, "not found");
    expect(response).toEqual(errorResponse);
  });

  test("should return error response not found with error object", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: NOT_FOUND,
      message: "not found"
    }

    const error = new Error("not found");
    const response: ReturnType = responseConstructor(NOT_FOUND, error);
    expect(response).toEqual(errorResponse);
  });

  // ERROR - 500 INTERNAL SERVER ERROR
  test("should return error response internal server error", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: INTERNAL_SERVER,
      message: "internal server error"
    }

    const response: ReturnType = responseConstructor(INTERNAL_SERVER, "internal server error");
    expect(response).toEqual(errorResponse);
  });

  test("should return error response internal server error with error object", () => {
    const errorResponse: ReturnType = {
      success: false,
      code: INTERNAL_SERVER,
      message: "internal server error"
    }

    const error = new Error("internal server error");
    const response: ReturnType = responseConstructor(INTERNAL_SERVER, error);
    expect(response).toEqual(errorResponse);
  });
})