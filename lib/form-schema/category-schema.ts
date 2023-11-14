import { z } from 'zod';

export const formCategorySchema = z.object({
  billboardId: z.string().min(1),
  name: z.string().min(1),
});

export type FormCategorySchemaType = z.infer<typeof formCategorySchema>;
