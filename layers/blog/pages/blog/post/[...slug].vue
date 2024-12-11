<script setup lang="ts">
import { GlmImg } from '@unicornify/gleam-ui';
import UncDocument from '~/components/unc-document.vue';

definePageMeta({
  layout: 'max-width',
});
</script>

<template>
  <UncDocument clas="unc-blog-post" #default="{ doc }">
    <GlmImg class="unc-blog-post__image" :src="doc.image" />
    <ContentRenderer :value="doc" />
  </UncDocument>
</template>

<style lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-blog-post {
  &__image {
    border-radius: $border-radius-l;
  }
}
</style>
