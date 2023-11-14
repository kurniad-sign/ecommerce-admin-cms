import { z } from 'zod';

export const formStoreSchema = z.object({
  name: z.string({ required_error: 'Store name is required' }).min(1),
  store_id: z
    .string()
    .min(0)
    .regex(/^[a-z0-9_\-]+$/, {
      message: 'Store id must be lowercase alphanumeric and non-leading hyphen',
    })
    .optional(),
  store_logo_url: z.string().optional(),
});

export type FormStoreSchemaType = z.infer<typeof formStoreSchema>;
