import { useAsyncData, useNuxtApp } from '#imports';
import type { MaybeRef } from 'vue';
import { unref } from 'vue';

type UseBlogPostsListOptions = {
  currentPage: MaybeRef<number>;
  category?: string;
};

export async function useBlogPostsList({ currentPage, category }: UseBlogPostsListOptions) {
  const { $api } = useNuxtApp();
  const { data: blogPosts, status } = await useAsyncData(
    'blog-posts',
    async () => {
      return $api.public.get('blog-posts', { page: unref(currentPage), category });
    },
    {
      default: () => ({
        data: [],
        totalResults: 0,
        totalPages: 0,
      }),
    },
  );

  return {
    blogPosts,
    status,
  };
}
