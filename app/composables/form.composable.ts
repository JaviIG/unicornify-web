import FormField from '../components/forms/FormField.vue';
import { isObjectEmpty, groupBy, type ExtractProps, map } from '@unicornify/utils';
import type { InjectionKey } from 'vue';
import { z } from 'zod';
import { compareElementPosition } from '~//utils/dom';
import { computed, inject, provide, type Ref, ref, useId } from 'vue';

type FormStatus = 'loading' | 'idle';
const FormKey: InjectionKey<{
  values: Ref<Record<string, unknown>>;
  errors: Ref<Partial<Record<string, z.ZodIssue[]>>>;
  validateField: (field: string) => void;
  clearFieldValidation: (field: string) => void;
  status: Ref<FormStatus>;
  ids: Record<string, string>;
}> = Symbol.for('form');

export type UseFormOptions<SomeSchema extends z.AnyZodObject> = {
  initialValues: z.infer<SomeSchema>;
  onSubmit: (values: z.infer<SomeSchema>) => Promise<void>;
  schema: SomeSchema;
};

function generateIds<SomeSchema extends z.AnyZodObject>(
  baseId: string,
  schema: SomeSchema,
): Record<keyof z.infer<SomeSchema>, string> {
  return map(schema.shape, (key) => `${baseId}-${key}`);
}

export function useForm<SomeSchema extends z.AnyZodObject>({
  initialValues,
  schema,
  onSubmit,
}: UseFormOptions<SomeSchema>) {
  type SomeForm = z.infer<SomeSchema>;
  type SomeFormErrors = Partial<Record<keyof SomeForm, z.ZodIssue[]>>;
  const baseId = useId();
  if (!baseId) throw Error('Unable to create an id');
  const ids = generateIds(baseId, schema);
  const values = ref<SomeForm>(initialValues) as Ref<SomeForm>;
  const errors = ref<SomeFormErrors>({}) as Ref<SomeFormErrors>;
  const hasErrors = computed(() => !isObjectEmpty(errors.value));
  const status = ref<FormStatus>('idle');

  function validate() {
    const result = schema.safeParse(values.value);
    if (!result.success) {
      errors.value = groupBy(result.error.errors, (error) =>
        error.path[0]!.toString(),
      ) as SomeFormErrors;
    }
  }

  function validateField(field: keyof SomeForm) {
    const value = values.value[field];
    const result = schema.shape[field].safeParse(value);
    if (result.success) {
      delete errors.value[field];
    } else {
      errors.value[field] = result.error.errors;
    }
  }

  function clearFieldValidation(field: keyof SomeForm) {
    delete errors.value[field];
  }

  async function submit() {
    try {
      status.value = 'loading';
      validate();
      if (hasErrors.value) {
        const elements = Object.keys(errors.value)
          .map((name) => document.getElementById(ids[name]!))
          .filter((el): el is HTMLElement => !!el)
          .sort(compareElementPosition);
        elements[0]?.focus();
      } else {
        await onSubmit(values.value);
      }
    } finally {
      status.value = 'idle';
    }
  }

  provide(FormKey, {
    values,
    errors,
    validateField,
    clearFieldValidation,
    status,
    ids,
  });

  const fields = computed<Record<keyof SomeForm, ExtractProps<typeof FormField>>>(() => {
    return Object.fromEntries(
      Object.keys(schema.shape).map((key) => {
        const props: ExtractProps<typeof FormField> = { name: key };
        return [key, props];
      }),
    ) as Record<keyof SomeForm, ExtractProps<typeof FormField>>;
  });

  return {
    values,
    errors,
    fields,
    validate,
    submit,
    hasErrors,
    ids,
  };
}

export function useSubmit() {
  const form = inject(FormKey)!;
  return {
    status: form.status,
  };
}

export function useFormField(name: string) {
  const form = inject(FormKey)!;
  const errors = computed(() => form.errors.value[name] ?? []);
  const value = computed(() => form.values.value[name]);
  const hasErrors = computed(() => errors.value.length > 0);
  const id = computed(() => form.ids[name]);
  return {
    id,
    value,
    errors,
    hasErrors,
    updateValue: (value: unknown) => {
      form.values.value[name] = value;
    },
    validate() {
      form.validateField(name);
    },
    clearValidation() {
      form.clearFieldValidation(name);
    },
  };
}
