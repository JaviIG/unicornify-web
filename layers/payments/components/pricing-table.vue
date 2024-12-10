<script setup lang="ts">
import { useNuxtApp } from '#imports';
import PricingCard from './pricing-card.vue';
import { subscriptions } from '~~/layers/payments/db/products';
import { useUser } from '~~/layers/auth/composables/user.composable';

const { $stripe } = useNuxtApp();
const { isSignedIn, authProviderUrls } = useUser();

function checkout(id: string) {
  if (!isSignedIn.value) {
    location.href = authProviderUrls.github;
  } else {
    $stripe.createPaymentIntent({ productId: id, quantity: 1 });
  }
}
</script>

<template>
  <section class="unc-pricing-table">
    <PricingCard
      :id="subscriptions.monthly.id"
      color="green"
      :old-price="subscriptions.monthly.oldPrice"
      :price="subscriptions.monthly.price"
      :name="$t('payments.pricing-table.monthly.title')"
      :subtitle="$t('payments.pricing-table.monthly.subtitle')"
      :buy-label="$t('payments.pricing-table.monthly.buy')"
      @click:buy="checkout"
    />
    <PricingCard
      :id="subscriptions.quarter.id"
      color="blue"
      :old-price="subscriptions.quarter.oldPrice"
      :price="subscriptions.quarter.price"
      :name="$t('payments.pricing-table.quarter.title')"
      :subtitle="$t('payments.pricing-table.quarter.subtitle')"
      is-featured
      :buy-label="$t('payments.pricing-table.quarter.buy')"
      @click:buy="checkout"
    />
    <PricingCard
      :id="subscriptions['half-year'].id"
      color="purple"
      :old-price="subscriptions['half-year'].oldPrice"
      :price="subscriptions['half-year'].price"
      :name="$t('payments.pricing-table.half-year.title')"
      :subtitle="$t('payments.pricing-table.half-year.subtitle')"
      :buy-label="$t('payments.pricing-table.half-year.buy')"
      @click:buy="checkout"
    />
  </section>
</template>

<style scoped lang="scss">
.unc-pricing-table {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
</style>
