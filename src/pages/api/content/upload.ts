import type { APIRoute } from 'astro';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const CONTENT_DIR = 'src/content/blog';
const IMAGES_DIR = 'public/images/blog';

interface BlogPost {
  title: string;
  description: string;
  content: string;
  image?: {
    name: string;
    base64: string;
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey || apiKey !== import.meta.env.API_KEY) {
      return new Response('Unauthorized', { status: 401 });
    }

    const data = await request.json() as BlogPost;
    
    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Save image if provided
    let imagePath = '';
    if (data.image) {
      const buffer = Buffer.from(data.image.base64, 'base64');
      imagePath = `/images/blog/${data.image.name}`;
      await writeFile(join(process.cwd(), 'public', imagePath), buffer);
    }

    // Create markdown content
    const markdown = `---
title: "${data.title}"
description: "${data.description}"
date: ${new Date().toISOString()}
image: "${imagePath}"
---

${data.content}`;

    // Save markdown file
    await writeFile(
      join(process.cwd(), CONTENT_DIR, `${slug}.md`),
      markdown
    );

    return new Response(JSON.stringify({ success: true, slug }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error uploading content:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}