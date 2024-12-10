<script setup lang="ts">
import { GlmButton } from '@unicornify/gleam-ui';

defineProps<{
  id: string;
  oldPrice?: number;
  price: number;
  name: string;
  buyLabel: string;
  subtitle: string;
  isFeatured?: boolean;
  color: 'green' | 'blue' | 'purple';
}>();

defineEmits<{
  'click:buy': [string];
}>();
</script>

<template>
  <article
    class="unc-pricing-card"
    :class="[`unc-pricing-card--color-${color}`, { 'unc-pricing-card--is-featured': isFeatured }]"
  >
    <h2 class="unc-pricing-card__name">
      <span class="unc-pricing-card__bubble" />
      {{ name }}
    </h2>
    <p class="unc-pricing-card__subtitle">{{ subtitle }}</p>

    <div class="unc-pricing-card__price-container">
      <p v-if="oldPrice" class="unc-pricing-card__price unc-pricing-card__price--old">
        <sup>$</sup>
        {{ oldPrice / 100 }}
      </p>
      <p class="unc-pricing-card__price">
        <sup>$</sup>
        {{ price / 100 }}
      </p>
    </div>
    <GlmButton
      class="unc-pricing-card__buy"
      :variant="isFeatured ? 'primary' : 'default'"
      @click="$emit('click:buy', id)"
    >
      {{ buyLabel }}
    </GlmButton>
  </article>
</template>

<style scoped lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-pricing-card {
  @extend %box-3;
  display: flex;
  flex-flow: column nowrap;
  gap: $spacing-xl;
  z-index: 0;
  border-radius: $border-radius-m;
  padding: var(--_unc-pricing-card-padding, $spacing-xl);
  width: var(--_unc-pricing-card-padding, 18rem);
  color: $font-color-light;
  &:has(+ .unc-pricing-card--is-featured) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &--is-featured + & {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &--is-featured {
    @extend %blur-m;
    --_unc-pricing-card-padding: #{$spacing-2xl};
    --_unc-pricing-card-font-size: #{$font-size-2xl};
    --_unc-pricing-card-font-size-small: #{$font-size-xl};
    z-index: 1;
    margin-inline: -1px;
    box-shadow: 0 0.25rem 2rem -0.5rem transparentize($primary-80, 0.85);
    width: 22rem;
  }

  &--color-green {
    --_unc-pricing-card-bubble-color: #{transparentize($green-80, 0.25)};
    --_unc-pricing-card-bubble-border-color: #{transparentize($green-60, 0.1)};
  }
  &--color-blue {
    --_unc-pricing-card-bubble-color: #{transparentize($blue-70, 0.25)};
    --_unc-pricing-card-bubble-border-color: #{transparentize($blue-60, 0.1)};
  }
  &--color-purple {
    --_unc-pricing-card-bubble-color: #{transparentize($primary-80, 0.25)};
    --_unc-pricing-card-bubble-border-color: #{transparentize($primary-60, 0.1)};
  }

  &__name {
    font-size: var(--_unc-pricing-card-font-size, $font-size-xl);
  }

  &__bubble {
    display: inline-block;
    vertical-align: middle;
    transform: rotate(45deg);
    margin-inline-end: $spacing-xs;
    box-shadow: 0 0 0.75rem -0.25rem var(--_unc-pricing-card-bubble-border-color);
    border-radius: 6px;
    background: var(--_unc-pricing-card-bubble-color);
    aspect-ratio: 1;
    height: 1.2rem;
  }

  &__subtitle {
    color: $font-color-faded;
    font-size: $font-size-m;
  }

  &__price-container {
    display: flex;
    flex-flow: row nowrap;
    align-items: baseline;
    gap: $spacing-xs;
  }

  &__price {
    font-weight: $font-weight-bold;
    font-size: var(--_unc-pricing-card-font-size, $font-size-xl);

    &--old {
      color: $font-color-faded;
      font-size: var(--_unc-pricing-card-font-size-small, $font-size-l);
      text-decoration: line-through;
    }
  }

  &__buy {
    align-self: center;
  }
}
</style>
