<script setup lang="ts">
import UncBlogPostCard from '~~/layers/blog/components/unc-blog-post-card.vue';
import { useBlogPostsList } from '~~/layers/blog/hooks/blog-posts-list.composable';
import { GlmPagination } from '@unicornify/gleam-ui';

const props = defineProps<{
  title: string;
  category?: string;
  page: number;
}>();

const { blogPosts } = await useBlogPostsList({
  category: props.category,
  currentPage: props.page,
});

const urlTemplate = props.category
  ? (page: number) => `/blog/categories/${props.category}/${page}`
  : (page: number) => `/blog/${page}`;
</script>

<template>
  <div class="unc-blog">
    <h1 class="unc-blog__title">{{ title }}</h1>
    <ul class="unc-blog__posts-list">
      <li v-for="post in blogPosts.data" :key="post._id">
        <UncBlogPostCard
          class="unc-blog__post"
          :author="post.author"
          :title="post.title"
          :date="post.date"
          :img-src="post.image"
          :tags="post.tags"
          :url="post._path"
        />
      </li>
    </ul>

    <GlmPagination
      class="unc-blog__pagination"
      :total-pages="blogPosts.totalPages"
      :url-template="urlTemplate"
      :max-page-items="7"
      :active="page"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-blog {
  display: flex;
  flex-flow: column nowrap;
  gap: $spacing-l;
  padding-block: $spacing-l;

  &__title {
    color: $font-color-light;
    font-size: $font-size-3xl;
  }

  &__posts-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    align-items: stretch;
    gap: $spacing-m;

    @include mq(m) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mq(l) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include mq(xl) {
      grid-template-columns: repeat(4, 1fr);
    }
    @include mq(3xl) {
      grid-template-columns: repeat(6, 1fr);
    }
    @include mq(4xl) {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  &__post {
    height: 100%;
  }

  &__pagination {
    align-self: center;
    margin-block: $spacing-l;
  }
}
</style>
