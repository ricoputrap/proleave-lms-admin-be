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

export const getBadRequestResponse = (message: string): ReturnType => responseConstructor(
  BAD_REQUEST,
  message
);

export const getUnauthorizedResponse = (message: string): ReturnType => responseConstructor(
  UNAUTHORIZED,
  message
);

export const getNotFoundResponse = (message: string): ReturnType => responseConstructor(
  NOT_FOUND,
  message
);

export const getInternalServerErrorResponse = (message: string): ReturnType => responseConstructor(
  INTERNAL_SERVER,
  message
);