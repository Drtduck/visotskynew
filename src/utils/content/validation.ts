import { z } from 'astro:content';

export const imageSchema = z.object({
  name: z.string(),
  base64: z.string(),
  mimeType: z.string().optional()
});

export const blogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  image: imageSchema.optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional()
});

export type BlogPost = z.infer<typeof blogPostSchema>;
export type ImageData = z.infer<typeof imageSchema>;