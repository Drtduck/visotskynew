import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export const CONTENT_DIR = 'src/content/blog';
export const IMAGES_DIR = 'public/images/blog';

export async function saveImage(base64Data: string, filename: string): Promise<string> {
  const buffer = Buffer.from(base64Data, 'base64');
  const imagePath = `/images/blog/${filename}`;
  await writeFile(join(process.cwd(), 'public', imagePath), buffer);
  return imagePath;
}

export async function saveMarkdownFile(slug: string, content: string): Promise<void> {
  await writeFile(
    join(process.cwd(), CONTENT_DIR, `${slug}.md`),
    content
  );
}