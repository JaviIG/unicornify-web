<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'm' | 'l';
  }>(),
  { size: 'l' },
);
</script>

<template>
  <div class="gij-rhombus-item" :class="`gij-rhombus-item--size-${size}`">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;
.gij-rhombus-item {
  display: flex;
  position: relative;
  align-items: center;

  &--size-l {
    --_gij-rhombus-radius: #{$border-radius-m};
    padding: $spacing-s;
    width: 4rem;
    height: 4rem;
  }

  &--size-m {
    --_gij-rhombus-radius: #{$border-radius-s};
    padding: $spacing-s;
    width: 3rem;
    height: 3rem;
  }

  * {
    width: 100%;
    height: 100%;
  }
  &:before,
  &:after {
    position: absolute;
    transform: rotate(45deg);
    inset: 0;
    border-radius: var(--_gij-rhombus-radius);
    content: '';
  }

  &:before {
    z-index: -2;
    box-shadow:
      inset 0 0.125rem 0.5rem -0.125rem rgba(241, 240, 244, 0.5),
      0 0.25rem 25px -0.25rem rgba(20, 17, 24, 0.5);
    background: $background-color-3;
  }

  &:after {
    opacity: 0.5;
    z-index: -1;
    mask-image: linear-gradient(135deg, black 15%, transparent, black 85%);
    border: solid 1px $border-color-3;
  }
}
</style>
