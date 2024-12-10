import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const UsersTable = sqliteTable('users', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  provider: text('provider', { enum: ['github'] }).notNull(),
  providerId: text('provider_id').unique().notNull(),
  createdAt: int('created_at', { mode: 'timestamp_ms' }).notNull(),
  subscriptionId: text('subscription_id').unique(),
  avatarUrl: text('avatar_url'),
});

export type UserRow = typeof UsersTable.$inferSelect;
