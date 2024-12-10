<script setup lang="ts">
import { definePageMeta, useRoute } from '#imports';
import UncBlogPostsList from '../../../../components/unc-blog-posts-list.vue';
import { computed } from 'vue';

definePageMeta({
  layout: 'max-width',
  name: 'post-categories',
});

const route = useRoute();
const { category, page: rawPage = '1' } = route.params as { category: string; page?: string };
const page = computed(() => parseInt(rawPage));
</script>

<template>
  <UncBlogPostsList
    :title="$t('blog.last-category-posts', { category })"
    :page="page"
    :category="category"
  />
</template>
