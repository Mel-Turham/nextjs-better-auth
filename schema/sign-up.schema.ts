import { z } from 'zod';

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has be filed.' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(20, { message: 'Password must be at most 20 characters long.' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'Password must contain at least one special character.',
    }),
  name: z.string().min(1, { message: 'This field has be filed.' }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
