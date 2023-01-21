import { ErrorResponse } from "../types/api.types";

export type SuccessReturnType<T> = {
  data: T | T[];
  total?: number;
}

export type ServiceReturnType<T> = {
  success?: SuccessReturnType<T>;
  error?: ErrorResponse;
}