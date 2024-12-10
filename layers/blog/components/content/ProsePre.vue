<script setup lang="ts">
import UncCopyButton from '../unc-copy-button.vue';

const props = defineProps<{
  code?: string;
  language?: string;
  filename?: string;
  highlights?: number[];
  meta?: string;
  class?: string;
  style?: string | Record<string, string>;
}>();
</script>

<template>
  <div class="unc-code-block">
    <div class="unc-code-block__header">
      <span v-if="language" class="unc-code-block__language">{{ language }}</span>
      <span v-if="filename" class="unc-code-block__filename">{{ filename }}</span>
      <UncCopyButton :content="props.code ?? ''" />
    </div>
    <ProseCode
      :code="code"
      :language="language"
      :filename="filename"
      :highlights="highlights"
      :meta="meta"
    >
      <pre :class="$props.class" :style="style"><slot /></pre>
    </ProseCode>
  </div>
</template>

<style scoped lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;
@use 'sass:color';

.unc-code-block {
  margin-block: $spacing-m;
  border-radius: $border-radius-m;
  background: $background-color-3;
  padding-block-end: $spacing-m;
  overflow: hidden;

  &__header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    background: $background-color-3;
    padding: $spacing-s $spacing-m;
  }
  &__copy {
    margin-inline-start: auto;
  }
  :deep(code) {
    @include scrollbar;
    display: grid;
    overflow: auto;
  }
  :deep(.line) {
    padding-inline-end: $spacing-m;
    font-size: $font-size-m;
    line-height: 1.25;
    span {
      display: inline;
      white-space: pre;
    }

    &:before {
      display: inline-block;
      position: sticky;
      backdrop-filter: blur(4px);
      box-sizing: content-box;
      margin-inline-end: $spacing-m;
      inset-inline-start: 0;
      border-inline-end: solid 1px $border-color-3;
      background: $background-color-3;
      padding-inline: $spacing-m;
      width: 3ch;
      height: 100%;
      content: attr(line);
      text-align: right;
    }
  }
  :deep(.highlight) {
    background: color.adjust($yellow-70, $alpha: -0.8);
  }
}
</style>
