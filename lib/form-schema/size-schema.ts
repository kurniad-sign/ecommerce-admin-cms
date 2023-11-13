import { z } from 'zod';

export const formSizeSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export type FormSizeSchemaType = z.infer<typeof formSizeSchema>;
