import { db } from '@/lib/db';

export default async function OrganizationPage() {
  const organization = await db.organization.findUnique({
    where: { id: 'cm83d38ik0000tvwpqdd67io3' },
  });
  console.log('-=---', organization);
  return (
    <div>
      <div>Organization Page</div>
    </div>
  );
}
