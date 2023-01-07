import { STATUS_CODES } from "../../constants/api.enum";
import { ReturnType } from "../../types/api.types";

const { OK, CREATED } = STATUS_CODES;

export const responseConstructor = (
  code: number,
  error?: string | any,
  data?: any
): ReturnType => {
  let result: ReturnType = { success: true, code }

  // ERROR
  if (!!error) {
    const message: string = !!error.message ? error.message : error;
    result = {
      success: false,
      message,
      code
    }
    return result;
  }

  // SUCCESS
  if (!!data) result.data = data;
  return result;
}

export const getSuccessResponse = (data?: any): ReturnType => responseConstructor(
  OK,
  "",
  data
)

export const getCreatedResponse = (data?: any): ReturnType => responseConstructor(
  CREATED,
  "",
  data
)

export const getBadRequestResponse = (message?: any): ReturnType => ({
  success: false,
  code: 500
});

export const getUnauthorizedResponse = (message: string): ReturnType => ({
  success: false,
  code: 500
});

export const getNotFoundResponse = (message: string): ReturnType => ({
  success: false,
  code: 500
});

export const getInternalServerErrorResponse = (message: string): ReturnType => ({
  success: false,
  code: 500
});