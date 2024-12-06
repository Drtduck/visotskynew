import type { ApiResponse, ApiError } from './types';

export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data
  };
}

export function createErrorResponse(error: string): ApiError {
  return {
    error
  };
}

export function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}