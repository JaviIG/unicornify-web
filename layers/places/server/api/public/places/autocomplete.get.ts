import { z } from 'zod';
import { defineApiRoute } from '~~/server/utils/api-route.util';

export const AutocompletePlaceRequestSchema = z.object({
  input: z.string().max(64),
  sessionToken: z.string().uuid(),
});

export type AutocompletePlaceRequest = z.infer<typeof AutocompletePlaceRequestSchema>;

export default defineApiRoute(
  {
    query: AutocompletePlaceRequestSchema,
  },
  async ({ event, query }) => {
    return await event.context.container.get('placesService').autocompletePlace(query);
  },
);
