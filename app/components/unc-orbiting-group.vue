<script setup lang="ts">
import { useState } from '#imports';
import GijRhombusItem from '~/components/unc-rhombus-item.vue';

const animationDurationSeconds = 12;
const items = 6;
const technologies = useState('technologies', () =>
  shuffle([
    'cypress',
    'graphql',
    'jest',
    'react',
    'rollupjs',
    'rxjs',
    'sass',
    'typescript',
    'vite',
    'vitest',
    'vuejs',
    'webpack',
  ])
    .slice(0, items)
    .map((tech, index) => ({
      style: {
        '--animation-delay': ((-index * animationDurationSeconds) / (items - 1)).toFixed(2) + 's',
      },
      iconSrc: `/images/icons/technologies/${tech}.svg`,
    })),
);

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
</script>

<template>
  <div class="gij-orbiting-group">
    <div
      v-for="tech in technologies"
      class="gij-orbiting-group__orbit"
      :style="tech.style"
      :key="tech.iconSrc"
    >
      <gij-rhombus-item class="gij-orbiting-group__rhombus">
        <img :src="tech.iconSrc" alt="" />
      </gij-rhombus-item>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;

$animation-duration: 16s;
.gij-orbiting-group {
  display: flex;
  flex-flow: column nowrap;
  gap: $spacing-m;
  transform-style: preserve-3d;
  perspective: 2048px;
  animation: orbit-rotation $animation-duration * 2 ease infinite alternate-reverse;

  &__orbit {
    transform-style: preserve-3d;
    animation: orbit $animation-duration var(--animation-delay) linear infinite;
  }

  &__rhombus {
    transform-style: preserve-3d;
    animation:
      orbit $animation-duration var(--animation-delay) linear infinite reverse,
      depth $animation-duration var(--animation-delay) linear infinite;
  }
}

@keyframes orbit {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

@keyframes orbit-rotation {
  0% {
    transform: rotateZ(-15deg);
  }
  100% {
    transform: rotateZ(15deg);
  }
}

@keyframes depth {
  0%,
  50%,
  100% {
    opacity: 1;
    filter: blur(0);
  }

  25%,
  75% {
    opacity: 0.15;
    filter: blur(6px);
  }
}
</style>
