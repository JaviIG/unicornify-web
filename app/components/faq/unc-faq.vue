<script setup lang="ts">
import type { AccordionItem } from './faq.types';
import { GlmExpandTransition, GlmSvgIcon } from '@unicornify/gleam-ui';
import { ref } from 'vue';
import { CaretRightIcon } from '@unicornify/gleam-ui-icons/caret-right';

defineProps<{
  items: AccordionItem[];
}>();

const activeIndex = ref<number | null>(null);

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <div class="unc-faq">
    <div
      v-for="(item, index) in items"
      class="unc-faq__entry"
      :class="{ 'unc-faq__entry--expanded': activeIndex === index }"
      :key="index"
    >
      <button class="unc-faq__question" @click="toggle(index)">
        <GlmSvgIcon class="unc-faq__question-icon" :name="CaretRightIcon" />
        {{ item.question }}
      </button>
      <GlmExpandTransition>
        <p v-show="activeIndex === index" class="unc-faq__answer">
          {{ item.answer }}
        </p>
      </GlmExpandTransition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@unicornify/gleam-ui/scss/index' as *;
.unc-faq {
  display: flex;
  flex-flow: column nowrap;
  gap: $spacing-s;
  backdrop-filter: blur($blur-m);
  border-radius: $border-radius-l;
  background: $background-color-3;
  padding: $spacing-2xl;
  width: 100%;
  max-width: 48rem;

  &__entry {
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-areas: 'icon question' 'icon answer';
    column-gap: $spacing-m;
    row-gap: $spacing-xs;
    width: 100%;

    &--expanded {
      --icon-rotation: 90deg;
      color: $font-color-light;
    }
  }

  &__question {
    display: contents;
    grid-area: question;
    align-items: baseline;
    transition: color 0.25s ease;
    cursor: pointer;
    padding: $spacing-s 0;
    color: $font-color-faded;
    font-size: $font-size-xl;
  }

  &__question-icon {
    grid-area: icon;
    transform: rotate(var(--icon-rotation));
    transition: transform 0.25s ease;
  }

  &__answer {
    grid-area: answer;
    overflow: hidden;
    color: $font-color-light;
    font-size: $font-size-l;
  }
}
</style>
