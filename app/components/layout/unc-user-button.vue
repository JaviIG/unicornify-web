<script lang="ts" setup>
import {
  GlmButton,
  GlmDropdownMenu,
  GlmDropdownMenuItem,
  GlmSvgIcon,
  GithubLogoIcon,
  UserCircleIcon,
} from '@unicornify/gleam-ui';
import { useUser } from '~~/layers/auth/composables/user.composable';

const { isSignedIn, signOut, authProviderUrls, user } = useUser();
</script>
<template>
  <GlmDropdownMenu v-if="isSignedIn" class="unc-user-button" variant="transparent" icon-only>
    <template #trigger>
      <img v-if="user?.avatarUrl" :src="user.avatarUrl" class="unc-user-button__avatar" />
      <GlmSvgIcon v-else :name="UserCircleIcon" />
    </template>
    <template #items>
      <GlmDropdownMenuItem to="/user/subscription">Subscription</GlmDropdownMenuItem>
      <GlmDropdownMenuItem @click="signOut">Sign Out</GlmDropdownMenuItem>
    </template>
  </GlmDropdownMenu>
  <GlmButton
    v-else
    class="unc-user-button"
    kind="external-link"
    :to="authProviderUrls.github + '?redirect=' + encodeURIComponent($route.fullPath)"
    variant="default"
  >
    <GlmSvgIcon :name="GithubLogoIcon" />
    Sign In with GitHub
  </GlmButton>
</template>

<style lang="scss" scoped>
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-user-button {
  &__avatar {
    margin: $bleed-xs;
    border-radius: 50%;
    aspect-ratio: 1;
    height: 2em;
  }
}
</style>
