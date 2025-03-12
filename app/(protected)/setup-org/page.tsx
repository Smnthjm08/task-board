import { auth } from '@/auth';
import { db } from '@/lib/db';
import test from 'node:test';

export default  function SetupOrganization() {
  // const session = await auth();

  // if (!session) {
  //   return <p>Loading...</p>;
  // }

  // if (session) {
  //   const test = await db.organization.findFirst({
  //     where: {
  //       ownerId: session?.user?.id,
  //     },
  //   });
  // }

  // console.log('user org data', test);
  return (
    <main>
     <SetupOrganization />
    </main>
  );
}
