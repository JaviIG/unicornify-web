<script setup lang="ts"></script>

<template>
  <ContentDoc #default="scope">
    <article class="unc-document">
      <slot v-bind="scope">
        <ContentRenderer :value="scope.doc" />
      </slot>
    </article>
  </ContentDoc>
</template>

<style lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;

.unc-document {
  margin-inline: auto;
  padding-block: $spacing-2xl;
  max-width: 50rem;
  color: $font-color-light;

  h1 {
    margin-block: $spacing-l;
    font-weight: $font-weight-bold;
    font-size: $font-size-4xl;
  }

  h2 {
    margin-block: $spacing-m;
    font-size: $font-size-3xl;
  }

  h3 {
    margin-block: $spacing-m;
    font-size: $font-size-2xl;
  }

  h4 {
    margin-block: $spacing-m;
    font-size: $font-size-xl;
  }

  h5 {
    margin-block: $spacing-m;
    font-weight: $font-weight-bold;
    font-size: $font-size-l;
  }

  h6 {
    margin-block: $spacing-s;
    font-size: $font-size-l;
  }

  p {
    margin-bottom: $spacing-s;

    a[href] {
      text-decoration: underline;
    }
  }

  a[href] {
    cursor: pointer;
  }

  strong {
    font-weight: $font-weight-bold;
  }

  em {
    font-style: italic;
  }

  del {
    text-decoration: line-through;
  }

  sup {
    vertical-align: super;
    font-size: $font-size-s;
  }

  sub {
    vertical-align: sub;
    font-size: $font-size-s;
  }

  blockquote {
    border-radius: $border-radius-m;
    background: $background-color-3;
    padding: $spacing-m;

    p:last-child {
      margin: 0;
    }
  }

  ul {
    list-style-position: inside;
  }

  ol {
    list-style-type: decimal;
    list-style-position: inside;

    ol {
      padding-inline-start: $spacing-m;
    }
  }

  table {
    border-radius: $border-radius-m;
    border-spacing: 0;
    background: $background-color-3;
    padding-bottom: $spacing-3xs;
    overflow: hidden;
    font-size: $font-size-m;
  }

  thead {
    background-color: $background-color-2;
  }

  th {
    padding: $spacing-s $spacing-m;
    font-weight: $font-weight-bold;
  }

  td {
    padding: $spacing-3xs $spacing-s;
  }

  hr {
    display: block;
    margin-block: $spacing-l;
    background: $border-color-3;
    height: 1px;
  }
}
</style>
