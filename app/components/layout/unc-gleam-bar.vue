<script lang="ts" setup>
withDefaults(defineProps<{ tag?: string }>(), { tag: 'div' });
</script>

<template>
  <component :is="tag" class="unc-gleam-bar">
    <slot></slot>
  </component>
</template>
<style lang="scss" scoped>
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-gleam-bar {
  backdrop-filter: blur($blur-m);
  box-shadow:
    inset 0 0.125rem 0.5rem -0.125rem rgba(241, 240, 244, 0.5),
    0 0.25rem 25px -0.25rem rgba(19, 17, 25, 0.5);
  border-radius: $border-radius-pill;
}
</style>
