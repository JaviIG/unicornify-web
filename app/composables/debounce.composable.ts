import { onUnmounted } from 'vue';
import { debounce } from '~/utils/timing';

export function useDebounce<T extends (...args: never[]) => unknown>(callback: T, wait: number) {
  const debounced = debounce(callback, wait);
  onUnmounted(() => {
    debounced.cancel();
  });

  return debounced;
}
