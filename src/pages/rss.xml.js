import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { formatRssDate, generateEnclosure, generateItemDescription } from '../utils/rssUtils';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  return rss({
    title: 'Андрей Высоцкий | Блог',
    description: 'Психолог для собственников бизнеса и топ-менеджеров. Помогаю преодолевать барьеры для роста.',
    site: context.site,
    xmlns: {
      yandex: "http://news.yandex.ru",
      media: "http://search.yahoo.com/mrss/"
    },
    customData: `
      <language>ru</language>
      <yandex:logo>https://visotski.psy/images/profile.jpg</yandex:logo>
      <yandex:logo type="square">https://visotski.psy/images/profile.jpg</yandex:logo>
      <generator>Astro v4.15.3</generator>
    `,
    items: blog.map((post) => ({
      title: post.data.title,
      description: generateItemDescription(post),
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      enclosure: generateEnclosure(post),
      customData: post.data.image ? `
        <media:content 
          url="${post.data.image}"
          type="image/jpeg"
          medium="image"
        />
        <yandex:full-text>${post.data.description}</yandex:full-text>
      ` : ''
    })),
  });
}
