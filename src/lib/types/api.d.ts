declare type SuccessfulResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type PaginatedResponse<T> = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
} & T;

declare type ApiResponse<T> = SuccessfulResponse<T> | ErrorResponse;
