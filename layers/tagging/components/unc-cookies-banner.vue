<script lang="ts" setup>
import { useTaggingCookies } from '#imports';
import { GlmButton } from '@unicornify/gleam-ui';

const { hasInteractedWithCookies, cookieSettings } = useTaggingCookies();
const emit = defineEmits<{
  'click:settings': [MouseEvent];
}>();

function rejectCookies() {
  hasInteractedWithCookies.value = true;
  cookieSettings.value = { essential: true, tracking: false };
}

function acceptAllCookies() {
  hasInteractedWithCookies.value = true;
  cookieSettings.value = { essential: true, tracking: true };
}

function configureCookies(event: MouseEvent) {
  hasInteractedWithCookies.value = true;
  emit('click:settings', event);
}
</script>

<template>
  <div v-if="!hasInteractedWithCookies" class="unc-cookies-banner">
    <i18n-t class="unc-cookies-banner__message" keypath="cookies.text" tag="p">
      <template #privacy-policy-link>
        <nuxt-link class="unc-cookies-banner__link" to="/legal/privacy-policy"
          >{{ $t('app.privacy-policy') }}
        </nuxt-link>
      </template>
    </i18n-t>
    <div class="unc-cookies-banner__actions">
      <GlmButton
        class="unc-cookies-banner__button"
        size="s"
        variant="transparent"
        @click="rejectCookies"
      >
        {{ $t('cookies.reject') }}
      </GlmButton>
      <GlmButton
        class="unc-cookies-banner__button"
        size="s"
        variant="default"
        @click="configureCookies"
      >
        {{ $t('cookies.settings') }}
      </GlmButton>
      <GlmButton
        class="unc-cookies-banner__button"
        size="s"
        variant="primary"
        @click="acceptAllCookies"
      >
        {{ $t('cookies.accept-all') }}
      </GlmButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-cookies-banner {
  display: flex;
  position: fixed;
  flex-flow: column nowrap;
  gap: $spacing-m;
  backdrop-filter: blur($blur-m);
  animation: slide-up 1s $ease-in-out-back;
  margin: 0 auto;
  inset-block-end: 6rem;
  inset-inline: 0;
  border: solid 1px $border-color-3;
  border-radius: $border-radius-l;
  background: $background-color-3;
  padding: $spacing-l;
  width: 100%;
  max-width: min(600px, 90vw);
  color: $font-color-light;

  &__link {
    cursor: pointer;
    text-decoration: underline;
    text-decoration-style: dotted;
    text-underline-offset: 4px;
  }

  &__actions {
    display: flex;
    flex-flow: row nowrap;
    justify-content: end;
    gap: $spacing-m;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(100%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translateY(0px) scale(1);
    opacity: 1;
  }
}
</style>
