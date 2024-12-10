<script setup lang="ts">
import { useTaggingCookies } from '../composables/tagging-cookies.composable';
import { GlmSwitch } from '@unicornify/gleam-ui';

const { cookieSettings } = useTaggingCookies();
</script>

<template>
  <div>
    <ul class="unc-cookies-settings">
      <li v-for="(_, key) in cookieSettings" class="unc-cookies-settings__item" :key="key">
        <label class="unc-cookie-toggle">
          <span class="unc-cookie-toggle__title">{{ $t(`cookies.kind.${key}.title`) }}</span>
          <span class="unc-cookie-toggle__description">
            {{ $t(`cookies.kind.${key}.description`) }}
          </span>
          <GlmSwitch
            class="unc-cookie-toggle__switch"
            :status="key === 'essential' ? 'readonly' : 'idle'"
            v-model="cookieSettings[key]"
          />
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-cookies-settings {
  display: flex;
  flex-flow: column nowrap;
  gap: $spacing-m;
  padding-block: $spacing-m;
  list-style: none;
}

.unc-cookie-toggle {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-areas: 'title switch' 'description switch';
  column-gap: $spacing-l;
  align-items: center;
  cursor: pointer;
  &__title {
    grid-area: title;
    color: $font-color-light;
  }
  &__description {
    grid-area: description;
    color: $font-color-faded;
    font-size: $font-size-s;
  }
  &__switch {
    grid-area: switch;
  }
}
</style>
