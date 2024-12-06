import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ensureDirectoryExists } from './files';
import type { ImageData } from '../content/validation';

export const IMAGES_DIR = 'public/images/blog';

export async function saveImage(imageData: ImageData): Promise<string> {
  const buffer = Buffer.from(imageData.base64, 'base64');
  const imagePath = `/images/blog/${imageData.name}`;
  const fullPath = join(process.cwd(), 'public', imagePath);
  
  await ensureDirectoryExists(fullPath);
  await writeFile(fullPath, buffer);
  
  return imagePath;
}