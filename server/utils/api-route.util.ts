import {
  createError,
  defineEventHandler,
  type EventHandler,
  getQuery,
  type H3Event,
  readBody,
} from 'h3';
import { ZodError, type ZodSchema } from 'zod';

export type DefineApiRouteRequestSchema<Query, Body> = {
  query?: ZodSchema<Query>;
  body?: ZodSchema<Body>;
};

export type HandlerOptions<Query, Body> = {
  event: H3Event;
} & (unknown extends Query ? { query: undefined } : { query: Query }) &
  (unknown extends Body ? { body: undefined } : { body: Body });

export function defineApiRoute<Query, Body, Response>(
  options: DefineApiRouteRequestSchema<Query, Body>,
  handler: (options: HandlerOptions<Query, Body>) => Response,
): EventHandler<Request, Response> {
  return defineEventHandler<Request>(async (event) => {
    try {
      const body = options.body?.parse(await readBody(event));
      const query = options.query?.parse(await getQuery(event));
      // @ts-expect-error If we don't have a query or a body parser it won't return the query or body parts
      return handler({ body, query, event });
    } catch (error) {
      if (error instanceof ZodError) {
        throw createError({
          status: 400,
          statusMessage: 'Invalid request',
          message: `The following request params are invalid: ${error.errors.map((e) => e.path.join('.')).join(', ')}`,
          data: error.errors,
        });
      }
      throw error;
    }
  });
}
