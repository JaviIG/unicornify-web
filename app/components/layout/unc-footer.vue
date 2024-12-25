<script lang="ts" setup>
import { GlmSvgIcon } from '@unicornify/gleam-ui';
import { XLogoIcon } from '@unicornify/gleam-ui-icons/x-logo';

const emit = defineEmits<{
  'click:settings': [MouseEvent];
}>();

const year = useState('year', () => new Date().getFullYear());

const socialNetworks: SocialNetwork[] = [
  {
    label: 'X',
    logo: XLogoIcon,
    url: 'https://x.com/',
  },
];

type SocialNetwork = {
  url: string;
  label: string;
  logo: string;
};
</script>

<template>
  <footer class="unc-footer">
    <p class="unc-footer__copyright">Copyright © {{ year }}</p>
    <div class="unc-footer__legal-links">
      <nuxt-link class="unc-footer__link" to="/legal/terms-and-conditions">
        {{ $t('app.terms-and-conditions') }}
      </nuxt-link>
      <nuxt-link class="unc-footer__link" to="/legal/privacy-policy">
        {{ $t('app.privacy-policy') }}
      </nuxt-link>
      <button class="unc-footer__link" @click="emit('click:settings', $event)">
        {{ $t('app.cookie-settings') }}
      </button>
    </div>

    <div class="unc-footer__social-networks">
      <a
        v-for="{ label, logo, url } in socialNetworks"
        :href="url"
        class="unc-footer__social-link"
        target="_blank"
        :key="label"
      >
        <span class="unc-footer__social-link-label">{{ label }}</span>
        <GlmSvgIcon :name="logo" />
      </a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-footer {
  @extend %box-3;
  display: flex;
  grid-area: footer;
  flex-flow: column nowrap;
  align-items: center;
  gap: $spacing-l;
  border-radius: $border-radius-l $border-radius-l 0 0;
  padding: $spacing-l;
  color: $font-color-faded;
  font-size: $font-size-s;

  @include mq(m) {
    font-size: $font-size-m;
  }

  &:after {
    border-bottom: none;
  }

  &__copyright {
  }

  &__legal-links {
    display: flex;
    flex-flow: row nowrap;
    gap: $spacing-s;
  }

  &__social-networks {
    display: flex;
    flex-flow: row nowrap;
    gap: $spacing-xs;
    line-height: 1em;
  }

  &__link {
  }

  &__social-link {
    font-size: $font-size-2xl;
  }

  &__social-link-label {
    @include sr-only;
  }

  &__link,
  &__social-link {
    transition: color 0.25s ease;
    cursor: pointer;

    &:hover {
      color: $font-color-light;
    }
  }

  @include mq(m) {
    flex-flow: row nowrap;
    gap: 0;
    white-space: nowrap;

    &__copyright {
      &:after {
        margin-inline: $spacing-m;
        content: '|';
      }
    }

    &__social-networks {
      display: flex;
      flex-flow: row nowrap;
      gap: $spacing-xs;
      margin-inline-start: auto;
      line-height: 1em;
    }
  }
}
</style>
