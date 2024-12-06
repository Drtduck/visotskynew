import { z } from 'astro:content';

export const blogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  image: z.object({
    name: z.string(),
    base64: z.string()
  }).optional()
});

export type BlogPost = z.infer<typeof blogPostSchema>;

export function validateApiKey(apiKey: string | null): boolean {
  return apiKey === import.meta.env.API_KEY;
}