'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

interface OrganizationData {
  name: string;
  slug?: string;
  logo?: string;
}

export async function createOrganization(data: OrganizationData) {
  const session = await auth();

  if (!session?.user) {
    return { error: 'Unauthorized' };
  }

  try {
    const existingOrg = await db.organization.findUnique({
      where: { slug: data.slug },
    });

    if (existingOrg) {
      throw new Error('Organization with this slug already exists.');
    }
    if (!session?.user?.id) return null;
    
    const organization = await db.organization.create({
      data: {
        name: data.name,
        logo: data.logo,
        slug: data.slug,
        ownerId: session?.user?.id,
        members: {
          create: {
            userId: session?.user?.id,
          },
        },
      },
    });

    return { success: true, organization };
  } catch (error) {
    console.error('Error creating organization:', error);

    return { error: 'Something went wrong!' };
  }
}
