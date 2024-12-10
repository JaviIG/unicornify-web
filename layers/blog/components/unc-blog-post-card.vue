<script lang="ts" setup>
import {
  GlmCardImg,
  GlmCardText,
  GlmCardTitle,
  GlmTag,
  GlmVerticalCardLayout,
} from '@unicornify/gleam-ui';

const props = defineProps<{
  imgSrc: string;
  title: string;
  date: string;
  tags: string[];
  url: string;
}>();

const viewTransitionName = `blog-card-${props.title.replaceAll(' ', '-').replace(/[^a-z0-9]/g, '')}`;
</script>

<template>
  <GlmVerticalCardLayout class="unc-blog-post-card">
    <template #image>
      <GlmCardImg :src="imgSrc">
        <div class="unc-blog-post-card__overlay">
          <ul class="unc-blog-post-card__tags-list">
            <GlmTag
              v-for="tag in tags"
              class="unc-blog-post-card__tag-item"
              color="neutral"
              tag="li"
              blur
              :key="tag"
            >
              <nuxt-link
                class="unc-blog-post-card__tag-link"
                :to="{ name: 'post-categories___en', params: { category: tag } }"
              >
                {{ tag }}
              </nuxt-link>
            </GlmTag>
          </ul>
        </div>
      </GlmCardImg>
    </template>
    <template #header>
      <GlmCardText variant="secondary">{{ date }}</GlmCardText>
      <GlmCardTitle :to="url">{{ title }}</GlmCardTitle>
    </template>
  </GlmVerticalCardLayout>
</template>

<style lang="scss" scoped>
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-blog-post-card {
  view-transition-name: v-bind(viewTransitionName);

  &__overlay {
    display: flex;
    flex-flow: column nowrap;
  }

  &__tags-list {
    display: flex;
    flex-flow: row nowrap;
    gap: $spacing-s;
    margin-top: auto;
  }

  &__tag-link {
    cursor: pointer;
  }
}
</style>
