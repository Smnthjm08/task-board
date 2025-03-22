import { z } from 'zod';

export const OrganizationScehma = z.object({
  title: z.string().email({ message: 'Title is Required' }),
});
