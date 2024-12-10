import * as z from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
});

export type SignUpForm = z.infer<typeof SignUpSchema>;
