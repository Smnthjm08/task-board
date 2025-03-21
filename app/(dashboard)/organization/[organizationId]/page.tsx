'use client';
import useOrganization from '@/hooks/use-organization';

export default function OrganizationPage() {
  const { organization, isOwner } = useOrganization();
  console.log('organization data', organization);

  if (!organization?.id) return <div>Loading org data...</div>;

  return (
    <div>
      <div>Organization Page - {organization.id}</div>
      {isOwner && <div>You are the owner of this organization</div>}
    </div>
  );
}
