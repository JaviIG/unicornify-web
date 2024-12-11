import { serverQueryContent } from '#content/server';
import { defineEventHandler } from 'h3';
import { SitemapStream, streamToPromise } from 'sitemap';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const docs = await serverQueryContent(event).find();
  const sitemap = new SitemapStream({
    hostname: config.domain,
  });

  for (const doc of docs) {
    sitemap.write({
      url: doc._path,
      changefreq: 'monthly',
    });
  }
  sitemap.end();

  return streamToPromise(sitemap);
});
