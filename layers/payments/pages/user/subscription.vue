<script lang="ts" setup>
import { definePageMeta, useAsyncData, useI18n, useNuxtApp } from '#imports';
import { GlmButton } from '@unicornify/gleam-ui';
import { computed } from 'vue';
import JlcGleamBar from '~/components/layout/unc-gleam-bar.vue';

definePageMeta({
  title: 'Subscription',
  layout: 'max-width',
});

const { $api } = useNuxtApp();
const { locale, t } = useI18n();

const {
  data: subscriptionDetails,
  refresh,
  status,
} = await useAsyncData(`subscription-details`, () => {
  return $api.private.get('payments/all');
});

function formatDate(date: string) {
  return new Date(date).toLocaleString(locale.value, {
    dateStyle: 'medium',
  });
}

function formatDateAndTime(date: string) {
  return new Date(date).toLocaleString(locale.value, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function formatCurrency(value: number, format: string) {
  return value.toLocaleString(locale.value, {
    style: 'currency',
    currency: format,
  });
}

async function cancelSubscription() {
  await $api.private.post('payments/cancel');
  await refresh();
}

async function reactivateSubscription() {
  await $api.private.post('payments/reactivate');
  await refresh();
}

const subscriptionStatus = computed(() => {
  const subscription = subscriptionDetails.value;
  if (!subscription) return 'unknown';
  if (subscription.willBeCanceled) return 'will-be-cancelled';
  if (subscription.status === 'active') return 'active';
  return 'cancelled';
});

const headerData = computed(() => {
  const status = subscriptionStatus.value;
  const subscription = subscriptionDetails.value;
  if (!subscription) return null;
  if (status === 'active')
    return {
      title: t('subscriptions.next-payment', { date: formatDate(subscription.nextPaymentDate!) }),
      variant: 'error' as const,
      actionLabel: t('subscriptions.cancel'),
      onclick: cancelSubscription,
    };
  if (status === 'will-be-cancelled')
    return {
      title: t('subscriptions.expires-at', {
        date: formatDate(subscription.nextPaymentDate!),
      }),
      variant: 'success' as const,
      actionLabel: t('subscriptions.reactivate'),
      onclick: reactivateSubscription,
    };
  if (status === 'cancelled')
    return {
      title: t('subscriptions.expired'),
      variant: 'success' as const,
      actionLabel: t('subscriptions.reactivate'),
      onclick: reactivateSubscription,
    };
  return null;
});
</script>

<template>
  <section v-if="status === 'success' || subscriptionDetails" class="unc-subscription-page">
    <template v-if="subscriptionDetails">
      <header v-if="headerData" class="unc-subscription-page__header">
        <p class="unc-subscription-page___date">
          {{ headerData.title }}
        </p>
        <GlmButton :variant="headerData.variant" @click="headerData.onclick">
          {{ headerData.actionLabel }}
        </GlmButton>
      </header>
      <div class="unc-subscription-page__invoices-history">
        <h2 class="unc-subscription-page__invoices-title">{{ $t('invoices-table.title') }}</h2>
        <table class="unc-invoices-table">
          <JlcGleamBar tag="thead" class="unc-invoices-table__header">
            <tr>
              <th class="unc-invoices-table__header-cell unc-invoices-table__header-cell--date">
                {{ $t('invoices-table.header.date') }}
              </th>
              <th class="unc-invoices-table__header-cell unc-invoices-table__header-cell--amount">
                {{ $t('invoices-table.header.amount') }}
              </th>
            </tr>
          </JlcGleamBar>
          <tr
            v-for="payment of subscriptionDetails.payments"
            class="unc-invoices-table__row"
            :key="payment.date"
          >
            <td class="unc-invoices-table__cell unc-invoices-table__date">
              {{ formatDateAndTime(payment.date) }}
            </td>
            <td class="unc-invoices-table__cell unc-invoices-table__amount">
              {{ formatCurrency(payment.amount / 100, payment.currency) }}
            </td>
          </tr>
        </table>
      </div>
    </template>
    <template v-else>
      <p class="unc-subscription-page__no-subscription">
        {{ $t('subscriptions.no-subscription') }}
      </p>
    </template>
  </section>
</template>

<style lang="scss" scoped>
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-subscription-page {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: $spacing-2xl;
  padding-block: $spacing-2xl;

  &__header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    gap: $spacing-m;
    width: 100%;
    color: $font-color-light;
    font-size: $font-size-l;
  }

  &__no-subscription {
    color: $font-color-light;
    font-size: $font-size-l;
  }

  &__invoices-history {
    display: flex;
    flex-flow: column nowrap;
    gap: $spacing-m;
    width: 100%;
    max-width: 32rem;
  }

  &__invoices-title {
    color: $font-color-light;
    font-size: $font-size-2xl;
  }
}

.unc-invoices-table {
  gap: $spacing-m;
  border-radius: $border-radius-xl;
  background: $background-color-3;
  width: 100%;
  list-style: none;

  &__header {
    color: $font-color-faded;
    text-transform: uppercase;
  }

  &__header-cell {
    padding: $spacing-m $spacing-2xl;
    text-align: left;

    &--amount {
      text-align: right;
    }
  }

  &__row {
    color: $font-color-light;
    white-space: nowrap;
  }

  &__cell {
    padding: $spacing-m $spacing-2xl;
  }

  &__amount {
    text-align: right;
  }
}
</style>
