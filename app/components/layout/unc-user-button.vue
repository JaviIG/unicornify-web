<script lang="ts" setup>
import { GlmDropdownMenu, GlmDropdownMenuItem, GlmSvgIcon } from '@unicornify/gleam-ui';
import { GithubLogoIcon } from '@unicornify/gleam-ui-icons/github-logo';
import { GoogleLogoIcon } from '@unicornify/gleam-ui-icons/google-logo';
import { UserCircleIcon } from '@unicornify/gleam-ui-icons/user-circle';
import { useUser } from '~~/layers/auth/composables/user.composable';

const { isSignedIn, signOut, authProviderUrls, user } = useUser();
</script>
<template>
  <GlmDropdownMenu :icon-only="isSignedIn" class="unc-user-button" v variant="transparent">
    <template #trigger>
      <template v-if="isSignedIn">
        <img v-if="user?.avatarUrl" :src="user.avatarUrl" class="unc-user-button__avatar" />
        <GlmSvgIcon v-else :name="UserCircleIcon" />
      </template>
      <template v-else>
        <GlmSvgIcon :name="UserCircleIcon" />
        Sign In
      </template>
    </template>
    <template #items>
      <template v-if="isSignedIn">
        <GlmDropdownMenuItem to="/user/subscription">Subscription</GlmDropdownMenuItem>
        <GlmDropdownMenuItem @click="signOut">Sign Out</GlmDropdownMenuItem>
      </template>
      <template v-else>
        <GlmDropdownMenuItem
          :to="authProviderUrls.github + '?redirect=' + encodeURIComponent($route.fullPath)"
          kind="external-link"
        >
          <GlmSvgIcon :name="GithubLogoIcon" />
          Sign In with GitHub
        </GlmDropdownMenuItem>
        <GlmDropdownMenuItem
          :to="authProviderUrls.google + '?redirect=' + encodeURIComponent($route.fullPath)"
          kind="external-link"
        >
          <GlmSvgIcon :name="GoogleLogoIcon" />

          Sign In with Google
        </GlmDropdownMenuItem>
      </template>
    </template>
  </GlmDropdownMenu>
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
