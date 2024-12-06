export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function handleApiError(error: unknown): never {
  if (isApiError(error)) {
    throw error;
  }
  
  throw new ApiError(
    error instanceof Error ? error.message : 'An unexpected error occurred',
    500
  );
}