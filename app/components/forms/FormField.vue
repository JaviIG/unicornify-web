<script setup lang="ts">
import { ExclamationMarkIcon, GlmExpandTransition, GlmSvgIcon } from '@unicornify/gleam-ui';
import type { MaybeArray } from '@unicornify/utils';
import { cloneVNode, type VNode } from 'vue';
import { useFormField } from '~//composables/form.composable';

const props = defineProps<{
  uncontrolled?: boolean;
  name: string;
}>();

const slots = defineSlots<{
  default: (scope: {
    validate: () => void;
    clearValidation: () => void;
    hasErrors: boolean;
  }) => unknown;
  label: () => unknown;
}>();

const { id, value, validate, updateValue, hasErrors, errors, clearValidation } = useFormField(
  props.name,
);

const Field = () => {
  const vNodes = slots.default({
    validate,
    clearValidation,
    hasErrors: hasErrors.value,
  }) as MaybeArray<VNode>;
  if (props.uncontrolled) return vNodes;

  const control = Array.isArray(vNodes) ? vNodes[0] : vNodes;
  return cloneVNode(control!, {
    modelValue: value.value,
    'onUpdate:modelValue': updateValue,
  });
};
</script>

<template>
  <div class="unc-field">
    <label class="unc-field__label" :for="id"><slot name="label" /></label>
    <Field />
    <GlmExpandTransition>
      <div v-if="hasErrors" class="unc-field__errors-wrapper">
        <div class="unc-field__errors">
          <GlmSvgIcon class="unc-field__error-icon" :name="ExclamationMarkIcon" />
          <ol class="unc-field__errors-list">
            <li v-for="error in errors" :key="error.code">{{ error.message }}</li>
          </ol>
        </div>
      </div>
    </GlmExpandTransition>
  </div>
</template>

<style scoped lang="scss">
@use '@unicornify/gleam-ui/scss/index' as *;
@use 'sass:math';

.unc-field {
  display: flex;
  flex-flow: column nowrap;
  gap: $spacing-s;
  color: $font-color-lightest;

  &__errors-wrapper {
    overflow: hidden; // for the animation
  }
  &__errors {
    display: flex;
    flex-flow: row nowrap;
    border-radius: $border-radius-m;
    background: $control-error-background;
    padding: $spacing-m;
  }

  &__errors-list {
    padding-inline-start: $spacing-s;
    list-style: none;
    text-wrap: pretty;
  }

  &__error-icon {
    margin-inline-start: math.div(-$spacing-s, 2);
    margin-block-start: math.div(-$spacing-s, 2);
    border-radius: $border-radius-pill;
    background: $control-error-background-hover;
    padding: 0.4em;
    height: 1.8em;
  }
}
</style>
