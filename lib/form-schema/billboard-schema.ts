import { z } from 'zod';

export const formBillboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export type FormBillboardSchemaType = z.infer<typeof formBillboardSchema>;
