import { auth } from '@/auth';
import { db } from '@/lib/db';

export default async function SetupOrganization() {
    const session = await auth();

  const org = await db.organization.findFirst({
    where: {
      ownerId: session?.user?.id,
    },
  });

  console.log('user org data', org);
  return (
    <main>
      <div>nfsvefndk</div>
    </main>
  );
}
