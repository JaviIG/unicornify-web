import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int(),
  provider: z.enum(['github']),
  providerId: z.string(),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
