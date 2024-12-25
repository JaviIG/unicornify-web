import { eq } from 'drizzle-orm';
import { UsersTable } from '~~/server/db/db-schema';
import type { UnicornifyWebDb } from '~~/server/middleware/00.container.middleware';

export function createUserService({ db }: CreateUserServiceOptions) {
  return {
    async createUserIfDoesNotExist({
      provider,
      providerId: rawProviderId,
      avatarUrl,
    }: CreateUserOptions) {
      const providerId = `${provider}:${rawProviderId}`;
      const existingUser = await db
        .select({
          id: UsersTable.id,
          provider: UsersTable.provider,
          providerId: UsersTable.providerId,
          avatarUrl: UsersTable.avatarUrl,
          createdAt: UsersTable.createdAt,
        })
        .from(UsersTable)
        .where(eq(UsersTable.providerId, providerId))
        .get();
      if (existingUser) {
        if (existingUser.avatarUrl !== avatarUrl) {
          await db
            .update(UsersTable)
            .set({ avatarUrl })
            .where(eq(UsersTable.id, existingUser.id))
            .run();
        }
        return { ...existingUser, avatarUrl };
      } else {
        return await db
          .insert(UsersTable)
          .values({
            createdAt: new Date(),
            provider,
            providerId,
            avatarUrl,
          })
          .returning()
          .get();
      }
    },
  };
}

export type UserService = ReturnType<typeof createUserService>;

export type CreateUserServiceOptions = {
  db: UnicornifyWebDb;
};

export type CreateUserOptions = {
  provider: 'github' | 'google';
  providerId: string;
  avatarUrl: string;
};
