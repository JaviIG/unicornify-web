import { useEventListener } from '@vueuse/core';
import { type Ref, unref, ref, type MaybeRef } from 'vue';

const useIsDragging = (key: string) => useState(`is-dragging-${key}`, () => false);

export function useDraggable<T>(
  el: Ref<HTMLElement | null | undefined>,
  { data, key }: UseDraggableOptions<T>,
) {
  const isDragging = useIsDragging(key);

  useEventListener(
    el,
    'dragstart',
    (e) => {
      if (!e.dataTransfer) return;
      if (data != null) {
        e.dataTransfer.setData(key, JSON.stringify(unref(data)));
      }
      isDragging.value = true;
    },
    false,
  );

  useEventListener(el, 'dragend', () => {
    isDragging.value = false;
  });

  return { isDragging };
}

export function useDropzone<T>(
  el: Ref<HTMLElement | null>,
  { onDrop, key }: UseDropzoneOptions<T>,
) {
  const isDraggingOver = ref(false);
  const isDragging = useIsDragging(key);

  useEventListener(el, 'dragenter', (e) => {
    if (!e.dataTransfer?.types.includes(key)) return;
    if (e.target !== el.value) return;

    e.preventDefault();
    isDraggingOver.value = true;
  });

  useEventListener(el, 'dragover', (e) => {
    if (!e.dataTransfer?.types.includes(key)) return;

    e.preventDefault();
    e.dataTransfer!.effectAllowed = 'move';
  });

  useEventListener(el, 'drop', (e) => {
    if (!e.dataTransfer?.types.includes(key)) return;

    isDraggingOver.value = false;
    isDragging.value = false;
    const data = e.dataTransfer?.getData(key);
    onDrop(JSON.parse(data!), e);
    e.preventDefault();
    e.stopPropagation();
  });
  useEventListener(el, 'dragleave', (e) => {
    if (!e.dataTransfer?.types.includes(key)) return;
    if (e.target !== el.value) return;
    e.preventDefault();
    isDraggingOver.value = false;
  });

  useEventListener('dragend', () => {
    isDragging.value = false;
  });

  return {
    isDraggingOver,
    isDragging,
  };
}

export type UseDraggableOptions<T> = {
  data?: MaybeRef<T>;
  key: string;
};

export type UseDropzoneOptions<T> = {
  onDrop: (data: T, e: DragEvent) => void;
  key: string;
};
