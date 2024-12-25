<script setup lang="ts">
import { GlmButton, GlmSvgIcon, type ButtonVariant } from '@unicornify/gleam-ui';
import { ref } from 'vue';
import { CheckIcon } from '@unicornify/gleam-ui-icons/check';
import { XIcon } from '@unicornify/gleam-ui-icons/x';
import { CopySimpleIcon } from '@unicornify/gleam-ui-icons/copy-simple';

const props = defineProps<{
  content: string;
}>();

const statusToVariant = {
  success: 'success',
  failed: 'error',
  idle: 'transparent',
} satisfies Record<string, ButtonVariant>;
const statusToIcon = {
  success: CheckIcon,
  failed: XIcon,
  idle: CopySimpleIcon,
} satisfies Record<string, string>;
const status = ref<keyof typeof statusToVariant>('idle');

async function copyContent() {
  if (status.value !== 'idle') return;
  try {
    await navigator.clipboard.writeText(props.content);
    status.value = 'success';
  } catch {
    status.value = 'failed';
  } finally {
    setTimeout(() => (status.value = 'idle'), 2000);
  }
}
</script>

<template>
  <GlmButton
    class="unc-code-block__copy"
    :variant="statusToVariant[status]"
    size="s"
    icon-only
    @click="copyContent"
  >
    <transition name="unc-scale-" mode="out-in">
      <GlmSvgIcon :name="statusToIcon[status]" :key="status" />
    </transition>
  </GlmButton>
</template>

<style scoped lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-scale {
  &--enter-from,
  &--leave-to {
    scale: 0;
  }

  &--enter-active,
  &--leave-active {
    transition: scale 0.25s $ease-in-out-back;
  }
}
</style>
