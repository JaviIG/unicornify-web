<script lang="ts" setup>
import { definePageMeta, useNuxtApp, useRouter, useUser } from '#imports';
import { GlmButton, GlmSvgIcon, CaretRightIcon } from '@unicornify/gleam-ui';
import { computed } from 'vue';
import type { AccordionItem } from '~/components/faq/faq.types';
import JlcFaq from '~/components/faq/unc-faq.vue';
import UncOrbitingGroup from '~/components/unc-orbiting-group.vue';
import { subscriptions } from '~~/layers/payments/db/products';

definePageMeta({
  layout: 'max-width',
});

const router = useRouter();

const faqQuestions = computed<AccordionItem[]>(() => [
  {
    question: 'Question 1',
    answer: `lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod`,
  },
  {
    question: 'Question 2',
    answer: `lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod`,
  },
  {
    question: 'Question 3',
    answer: `lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod`,
  },
]);

const { $stripe } = useNuxtApp();
const { isSignedIn, authProviderUrls, isSubscriptionActive } = useUser();

function checkout() {
  if (!isSignedIn.value) {
    location.href = authProviderUrls.github;
  } else if (!isSubscriptionActive()) {
    $stripe.createPaymentIntent({ productId: subscriptions.monthly.id, quantity: 1 });
  } else {
    router.push('/');
  }
}
</script>

<template>
  <div class="unc-index-page">
    <h1 class="unc-index-page__title">
      <span class="unc-index-page__title-line">Catchy title</span>
      <span class="unc-index-page__title-line">Impressive subtitle</span>
    </h1>
    <p class="unc-index-page__description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
      Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
      tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien
      nunc eget odio. Nam varius orci in
    </p>
    <p class="unc-index-page__description-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
      Proin gravida dolor sit amet lacus accumsan
    </p>
    <GlmButton class="unc-index-page__cta" variant="primary" size="l" @click="checkout">
      Start now
      <GlmSvgIcon :name="CaretRightIcon" />
    </GlmButton>
    <JlcFaq :items="faqQuestions" />
    <UncOrbitingGroup class="unc-index-page__orbiting-icons" />
    <div class="unc-index-page__background" />
  </div>
</template>

<style lang="scss" scoped>
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-index-page {
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  align-items: center;
  gap: $spacing-2xl;
  padding-top: $spacing-2xl;

  min-height: 100%;

  @include mq(m) {
    padding-top: 4 * $spacing-2xl;
  }

  &__title {
    filter: drop-shadow(0 0 0.2rem $primary-80);
    background: linear-gradient(to bottom, $primary-80, $font-color-lightest);
    background-clip: text;
    max-width: 26ch;
    color: transparent;
    font-size: 3rem;
    text-align: center;
    text-wrap: pretty;
    @include mq(m) {
      font-size: 4rem;
    }
  }

  &__title-line {
    display: block;
  }

  &__description {
    max-width: 60rem;
    color: $font-color-faded;
    font-size: $font-size-xl;
  }

  &__description-2 {
    max-width: 60rem;
    color: $font-color-light;
    font-size: $font-size-xl;
    text-align: center;
    @include mq(m) {
      text-align: left;
    }
  }

  &__orbiting-icons {
    position: absolute;
    z-index: -1;
    width: 100%;
  }

  &__background {
    position: absolute;
    z-index: -2;
    mask: radial-gradient(ellipse at center, black 0, transparent 85%);
    inset: -4rem;
    background: url('/images/icons/star.svg') center center / 1.5rem;
  }

  &__price-original {
    color: $font-color-faded;
    text-decoration: line-through;
  }

  &__price-discount {
    color: $font-color-lightest;
  }
}
</style>
