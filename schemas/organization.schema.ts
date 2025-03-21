import { z } from 'zod';

export const OrganizationScehma = z.object({
  email: z.string().email({ message: 'Email is Required' }),
  password: z.string().min(3, {
    message: 'Password is Required',
  }),
});
