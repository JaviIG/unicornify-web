import { NuxtLink } from '#components';
import { GleamPlugin } from '@unicornify/gleam-ui';
import { useId } from 'vue';

export default defineNuxtPlugin((app) => {
  app.vueApp.use(GleamPlugin, { linkComponent: NuxtLink, useId });
});
