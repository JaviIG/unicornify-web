import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
});

export type SignInForm = z.infer<typeof SignInSchema>;
