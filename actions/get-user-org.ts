'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export default async function getUserWithOrganization() {
  const session = await auth();

  if (!session?.user?.email) return null; // Ensure we have an email

  const user = await db.user.findUnique({
    where: { email: session.user.email }, // Corrected field
    include: { organizations: true },
  });

  return user;
}
