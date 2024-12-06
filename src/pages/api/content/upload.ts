import type { APIRoute } from 'astro';
import { blogPostSchema } from '../../../utils/content/validation';
import { validateApiKey, validateContentType } from '../../../utils/api/validation';
import { transformBlogPost } from '../../../utils/content/transform';
import { generateMarkdown } from '../../../utils/content/markdown';
import { saveMarkdownFile } from '../../../utils/storage/files';
import { createSuccessResponse, createErrorResponse } from '../../../utils/api/response';
import { ApiError } from '../../../utils/api/error';

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!validateApiKey(request)) {
      throw new ApiError('Unauthorized', 401);
    }

    if (!validateContentType(request)) {
      throw new ApiError('Invalid content type', 415);
    }

    const rawData = await request.json();
    const data = blogPostSchema.parse(rawData);
    const transformedData = await transformBlogPost(data);
    
    const markdown = generateMarkdown(transformedData);
    await saveMarkdownFile(transformedData.slug, markdown);

    return new Response(
      JSON.stringify(createSuccessResponse({ slug: transformedData.slug })),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing content upload:', error);
    
    const status = error instanceof ApiError ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    
    return new Response(
      JSON.stringify(createErrorResponse(message)),
      {
        status,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}