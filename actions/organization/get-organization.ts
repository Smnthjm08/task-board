'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export default async function getUserOrganization() {
  const session = await auth();

  if (!session?.user?.id) return null;

  const organization = await db.organization.findFirst({
    where: { members: { some: { userId: session?.user?.id } } },
    select: { id: true, name: true, ownerId: true, logo: true },
  });

  return { ...organization, userId: session.user.id };
}
