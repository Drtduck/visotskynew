import type { APIRoute } from 'astro';
import { blogPostSchema, validateApiKey } from '../../../utils/validation';
import { saveImage, saveMarkdownFile } from '../../../utils/files';
import { generateSlug } from '../../../utils/slugify';
import { generateMarkdown } from '../../../utils/markdown';

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = request.headers.get('x-api-key');
    
    if (!validateApiKey(apiKey)) {
      return new Response('Unauthorized', { status: 401 });
    }

    const data = blogPostSchema.parse(await request.json());
    const slug = generateSlug(data.title);
    
    let imagePath = '';
    if (data.image) {
      imagePath = await saveImage(data.image.base64, data.image.name);
    }

    const markdown = generateMarkdown({
      title: data.title,
      description: data.description,
      imagePath,
      content: data.content
    });

    await saveMarkdownFile(slug, markdown);

    return new Response(JSON.stringify({ success: true, slug }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error uploading content:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Internal Server Error' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}