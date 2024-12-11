<script lang="ts" setup>
import { GlmButton } from '@unicornify/gleam-ui';

definePageMeta({
  title: 'Payment completed',
  layout: 'max-width',
});

const route = useRoute();
const { $api } = useNuxtApp();

const { data: orderStatus } = await useAsyncData(`order-${route.params.id}`, () => {
  return $api.private.get('payments/status', { sessionId: route.params.id });
});
</script>

<template>
  <section v-if="orderStatus?.paymentStatus === 'paid'" class="unc-payment-completed">
    <p class="unc-payment-completed__text">{{ $t('payments.success.message') }}</p>
    <GlmButton class="unc-payment-completed__cta" size="l" variant="primary">
      {{ $t('payments.success.cta') }}
    </GlmButton>
  </section>
</template>

<style lang="scss" scoped>
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-payment-completed {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: $spacing-2xl;
  padding-block: $spacing-2xl;

  &__text {
    max-width: 48rem;
    color: $font-color-light;
    font-size: $font-size-3xl;
  }
}
</style>
