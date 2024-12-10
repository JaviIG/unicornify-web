<script setup lang="ts">
import { GlmButton } from '@unicornify/gleam-ui';
import { useSubmit } from '~//composables/form.composable';

const { status } = useSubmit();

defineSlots<{
  default: () => unknown;
}>();
</script>

<template>
  <GlmButton variant="primary" :status="status" type="submit">
    <slot />
  </GlmButton>
</template>

<style scoped lang="scss"></style>
