import { defineApiRoute } from '~~/server/utils/api-route.util';

export default defineApiRoute({}, ({ event }) => {
  return event.context.user;
});
