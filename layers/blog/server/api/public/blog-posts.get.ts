import { serverQueryContent } from '#content/server';
import type { BlogPost } from '~~/layers/blog/models/blog-post.model';
import { defineApiRoute } from '~~/server/utils/api-route.util';
import { z } from 'zod';

export const GetBlogPostsRequestSchema = z.object({
  category: z.string().optional(),
  page: z.coerce.number().min(1),
});

export type GetBlogPostsRequest = z.infer<typeof GetBlogPostsRequestSchema>;

export default defineApiRoute(
  {
    query: GetBlogPostsRequestSchema,
  },
  async ({ event, query }) => {
    const pageSize = 24;
    const [count, blogPosts] = await Promise.all([
      serverQueryContent(event, 'blog')
        .where({
          tags: {
            $contains: query.category,
          },
        })
        .count(),
      serverQueryContent(event, 'blog')
        .sort({ date: -1 })
        .skip(pageSize * (query.page - 1))
        .where({
          tags: {
            $contains: query.category,
          },
        })
        .only(['_id', 'author', 'title', 'date', 'image', 'tags', '_path'])
        .limit(pageSize)
        .find(),
    ]);

    return {
      totalResults: count,
      totalPages: Math.ceil(count / pageSize),
      data: blogPosts as BlogPost[],
    };
  },
);
