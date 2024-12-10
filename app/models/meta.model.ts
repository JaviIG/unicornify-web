import { z } from 'zod';

export const MetaSchema = z.object({
  jobsCount: z.number(),
  technologies: z.array(z.string()),
  currencies: z.array(z.string()),
});

export type Meta = z.infer<typeof MetaSchema>;
