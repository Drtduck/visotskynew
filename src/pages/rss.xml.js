import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Андрей Высоцкий | Блог',
    description: 'Психолог для собственников бизнеса и топ-менеджеров. Помогаю преодолевать барьеры для роста.',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>ru-ru</language>`,
  });
}