import type { BlogPost } from './validation';
import { generateSlug } from './slugify';
import { saveImage } from '../storage/images';

export async function transformBlogPost(post: BlogPost): Promise<BlogPost & { slug: string }> {
  const slug = generateSlug(post.title);
  
  if (post.image) {
    const imagePath = await saveImage(post.image);
    return { ...post, image: { ...post.image, path: imagePath }, slug };
  }
  
  return { ...post, slug };
}