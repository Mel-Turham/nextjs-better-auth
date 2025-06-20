import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has be filed.' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
