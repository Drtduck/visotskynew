import type { BlogPost } from './validation';

interface MarkdownOptions {
  includeDate?: boolean;
  dateFormat?: 'iso' | 'short';
}

export function generateMarkdown(
  post: BlogPost, 
  options: MarkdownOptions = {}
): string {
  const { includeDate = true, dateFormat = 'iso' } = options;
  
  const frontmatter = {
    title: post.title,
    description: post.description,
    ...(post.image && { image: post.image }),
    ...(includeDate && { date: formatDate(new Date(), dateFormat) }),
    ...(post.tags && { tags: post.tags }),
    ...(post.draft !== undefined && { draft: post.draft })
  };

  return `---
${Object.entries(frontmatter)
  .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
  .join('\n')}
---

${post.content}`;
}

function formatDate(date: Date, format: 'iso' | 'short'): string {
  return format === 'iso' ? 
    date.toISOString() : 
    date.toLocaleDateString('en-US');
}