import { API_CONFIG } from './config';

export function validateApiKey(request: Request): boolean {
  const apiKey = request.headers.get(API_CONFIG.headers.apiKey);
  return apiKey === import.meta.env.API_KEY;
}

export function validateContentType(request: Request): boolean {
  const contentType = request.headers.get(API_CONFIG.headers.contentType);
  return contentType?.includes('application/json') ?? false;
}