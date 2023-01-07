import { ReturnType } from "../../types/api.types";

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