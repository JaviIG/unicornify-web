export function waitFor<T>(
  callback: () => T | Promise<T>,
  { interval, timeout }: WaitForOptions,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => reject('Timeout'), timeout);
    const intervalId = setInterval(async () => {
      const result = await callback();
      if (result) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        resolve(result);
      }
    }, interval);
  });
}

type WaitForOptions = {
  interval?: number;
  timeout?: number;
};

export function debounce<T extends (...args: never[]) => unknown>(callback: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, wait);
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  return debounced;
}
