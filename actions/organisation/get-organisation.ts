'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export default async function getUserOrganisation() {
  const session = await auth();

  if (!session?.user?.id) return null;

  const organisation = await db.organization.findFirst({
    where: { members: { some: { userId: session?.user?.id } } },
    select: { id: true, name: true, ownerId: true },
  });

  // returning the userId as well because its needed at the organisation isContext
  return { ...organisation, userId: session.user.id };
}
