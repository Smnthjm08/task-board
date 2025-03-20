'use client';
import OrganisationContext from '@/context/org-context';
import { db } from '@/lib/db';
import { useContext } from 'react';

export default function OrganizationPage() {
  const organisation = useContext(OrganisationContext);
  console.log('organisation data', organisation);

  if (!organisation) return <div>Loading org data...</div>;

  return (
    <div>
      <div>Organization Page - {organisation?.organisation?.id}</div>
    </div>
  );
}
