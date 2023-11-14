import { z } from 'zod';

export const formColorSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, {
    message: 'String must be a valid hex color',
  }),
});

export type FormColorSchemaType = z.infer<typeof formColorSchema>;
