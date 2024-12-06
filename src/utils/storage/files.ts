import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';

export const CONTENT_DIR = 'src/content/blog';

export async function ensureDirectoryExists(path: string): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
}

export async function saveMarkdownFile(slug: string, content: string): Promise<void> {
  const filePath = join(process.cwd(), CONTENT_DIR, `${slug}.md`);
  await ensureDirectoryExists(filePath);
  await writeFile(filePath, content);
}