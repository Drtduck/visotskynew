import type { CollectionEntry } from 'astro:content';

export function formatRssDate(date: Date): string {
  return date.toUTCString();
}

export function generateEnclosure(post: CollectionEntry<'blog'>) {
  if (!post.data.image) return null;
  
  return {
    url: new URL(post.data.image, 'https://visotski.psy').href,
    type: 'image/jpeg',
    length: 0 // Since we can't get the file size in browser environment
  };
}

export function generateItemDescription(post: CollectionEntry<'blog'>) {
  const description = post.data.description || '';
  const imageHtml = post.data.image 
    ? `<figure><img src="${post.data.image}" alt="${post.data.title}"/></figure>`
    : '';

  return `${imageHtml}<p>${description}</p>`;
}
