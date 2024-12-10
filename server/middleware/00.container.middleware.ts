import { useRuntimeConfig } from '#imports';
import {
  type CfProperties,
  D1Database,
  type ExecutionContext,
  Request,
} from '@cloudflare/workers-types';
import { drizzle, type DrizzleD1Database } from 'drizzle-orm/d1';
import { defineEventHandler } from 'h3';
import Mailjet from 'node-mailjet';
import {
  createLazyContainer,
  type CreateLazyContainerOptions,
  type LazyContainer,
} from '~/utils/container';
import { type ContainerValues } from '../container.types';

import * as schema from '../db/db-schema';
import { createMailService } from '../services/mail.service';

declare module 'h3' {
  interface H3EventContext {
    cf: CfProperties;
    cloudflare: {
      request: Request;
      env: {
        DB: D1Database;
      };
      context: ExecutionContext;
    };
    container: LazyContainer<ContainerValues>;
  }
}

export type UnicornifyWebDb = DrizzleD1Database<typeof schema>;

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  event.context.container = createLazyContainer({
    mailService() {
      return createMailService(
        new Mailjet({
          apiKey: config.mailgunPrivateApiKey,
          apiSecret: config.mailgunPrivateSecretKey,
        }),
      );
    },
    db() {
      const bindingName = 'DB';
      // @ts-expect-error Hacky way of retrieving the DB cause sometimes event.context.cloudflare is not defined
      const db = globalThis.__env__?.[bindingName] || globalThis.__cf_env__?.[bindingName];
      // https://github.com/Hebilicious/authjs-nuxt/issues/137
      return drizzle(db, { schema });
    },
  } as unknown as CreateLazyContainerOptions<ContainerValues>);
});
