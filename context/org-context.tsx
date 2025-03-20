'use client';

import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getUserWithOrganisation from '@/actions/organisation/get-organisation';

interface OrganisationContextTypes {
  id: string;
  name: string;
  ownerId: string;
}

interface OrganisationContextValue {
  organisation: OrganisationContextTypes | undefined;
  setOrganisation: (org: OrganisationContextTypes | undefined) => void;
  isOwner: boolean;
}

const OrganisationContext = createContext<OrganisationContextValue | undefined>(
  undefined
);

export const OrganisationProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [organisation, setOrganisation] = useState<OrganisationContextTypes | undefined>();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrganisation = async () => {
      const organisationData = await getUserWithOrganisation();

      if (!organisationData) {
        router.push('/setup-organisation');
      } else {
        setOrganisation({
          id: organisationData.id ?? '',
          name: organisationData.name ?? '',
          ownerId: organisationData.ownerId ?? '',
        });

        setIsOwner(organisationData.ownerId === organisationData.userId);
      }
    };

    fetchOrganisation();
  }, []);

  return (
    <OrganisationContext.Provider value={{ organisation, setOrganisation, isOwner }}>
      {children}
    </OrganisationContext.Provider>
  );
};

export default OrganisationContext;
