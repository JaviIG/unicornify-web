<script lang="ts" setup>
const i18nHead = useLocaleHead({
  seo: true,
});
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
  title: 'UnicornifyWeb',
});
</script>
<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>
