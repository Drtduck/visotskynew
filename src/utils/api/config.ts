export const API_CONFIG = {
  baseUrl: import.meta.env.PUBLIC_API_URL || 'http://localhost:4321',
  endpoints: {
    upload: '/api/content/upload'
  },
  headers: {
    apiKey: 'x-api-key',
    contentType: 'Content-Type'
  }
} as const;