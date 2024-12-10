<script setup lang="ts">
import { definePageMeta } from '#imports';
import UncDocument from '~/components/unc-document.vue';

definePageMeta({
  layout: 'max-width',
});
</script>

<template>
  <UncDocument class="unc-legal" />
</template>

<style scoped lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-legal {
}
</style>
