<script lang="ts" setup>
import type { GlmModalInstance, NavbarLink } from '@unicornify/gleam-ui';
import { GlmModal, GlmNavbar, GlmNavbarLogo } from '@unicornify/gleam-ui';
import { computed, ref } from 'vue';
import UncFooter from '~/components/layout/unc-footer.vue';
import UncUserButton from '~/components/layout/unc-user-button.vue';
import UncCookiesBanner from '~~/layers/tagging/components/unc-cookies-banner.vue';
import UncCookiesSettings from '~~/layers/tagging/components/unc-cookies-settings.vue';

const links = computed<NavbarLink[]>(() => [
  {
    label: 'Home',
    to: '/',
  },
]);
const cookiesModalRef = ref<GlmModalInstance>();
</script>

<template>
  <div class="unc-max-width-layout">
    <header class="unc-max-width-layout__header">
      <GlmNavbar :links="links" class="unc-max-width-layout__navbar" variant="start-aligned">
        <template #logo>
          <GlmNavbarLogo logo-src="/images/logo.svg" />
        </template>
      </GlmNavbar>
      <UncUserButton />
    </header>

    <main class="unc-max-width-layout__content">
      <slot />
    </main>

    <UncFooter
      class="unc-max-width-layout__footer"
      @click:settings="cookiesModalRef?.open($event.target as HTMLElement)"
    />

    <UncCookiesBanner @click:settings="cookiesModalRef?.open($event.target as HTMLElement)" />

    <GlmModal ref="cookiesModalRef">
      <UncCookiesSettings />
    </GlmModal>
  </div>
</template>

<style lang="scss" scoped>
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-max-width-layout {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  grid-template-columns: 1fr min(100%, 1440px) 1fr;
  grid-template-areas: '. header .' '. content .' '. footer .';
  row-gap: $spacing-l;
  padding-inline: $spacing-l;
  min-height: 100dvh;
  overflow: hidden;

  &__header {
    display: flex;
    position: sticky;
    top: 0;
    grid-area: header;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    isolation: isolate;
    padding-block: $spacing-l;
  }

  &__content {
    grid-area: content;
  }

  &__footer {
    grid-area: footer;
    margin-inline: -$spacing-l;
    @include mq(m) {
      margin-inline: 0;
    }
  }

  &__logo {
    margin-inline-start: $spacing-m;
    height: 2rem;
  }
}
</style>
