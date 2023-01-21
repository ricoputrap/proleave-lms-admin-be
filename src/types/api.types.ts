export type DeleteReturnType = {
  acknowledged: boolean;
  deletedCount?: number;
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  prev?: string;
  next?: string;
}

export type SuccessResponse<T> = {
  data: T | T[];
  pagination?: Pagination;
}

export type ErrorResponse = {
  code: number;
  name: string;
  message: string;
}

export type FGetSingleItem<T> = (filter: any) => Promise<T | null>;