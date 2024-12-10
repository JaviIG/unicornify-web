<script lang="ts" setup>
import { definePageMeta, useRoute } from '#imports';
import { computed } from 'vue';
import UncBlogPostsList from '../../components/unc-blog-posts-list.vue';

definePageMeta({
  layout: 'max-width',
  alias: '/blog',
});

const route = useRoute();
const page = computed(() => parseInt(route.params.page as string) || 1);
</script>

<template>
  <UncBlogPostsList :title="$t('blog.last-posts')" :page="page" />
</template>
