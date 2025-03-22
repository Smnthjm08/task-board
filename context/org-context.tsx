'use client';

import React, { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getUserWithOrganization from '@/actions/organization/get-organization';
import { OrganizationContextTypes } from '@/types/types';

export interface OrganizationContextValue {
  organization: OrganizationContextTypes | undefined;
  setOrganization: (org: OrganizationContextTypes | undefined) => void;
  isOwner: boolean;
}

const OrganizationContext = createContext<OrganizationContextValue>({
  organization: undefined,
  setOrganization: () => {},
  isOwner: false,
});

export const OrganizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [organization, setOrganization] = useState<
    OrganizationContextTypes | undefined
  >();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      const organizationData = await getUserWithOrganization();

      if (!organizationData?.id) {
        router.push('/setup-organization');
      } else {
        setOrganization({
          id: organizationData.id ?? '',
          name: organizationData.name ?? '',
          ownerId: organizationData.ownerId ?? '',
          userId: organizationData.userId ?? '',
          subscription: organization?.subscription ?? 'FREE',
        });

        setIsOwner(organizationData.ownerId === organizationData.userId);
      }
    };

    fetchOrganization();
  }, []);

  return (
    <OrganizationContext.Provider
      value={{ organization, setOrganization, isOwner }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationContext;
