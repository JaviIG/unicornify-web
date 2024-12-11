import { createError, defineEventHandler, getHeader } from 'h3';

export default defineEventHandler(async (event) => {
  if (event.path.includes('/internal/')) {
    const runtimeConfig = useRuntimeConfig(event);
    const secret = getHeader(event, 'x-secret');
    if (secret !== runtimeConfig.internalApiSecret) {
      throw createError({ statusCode: 401 });
    }
  }
});
