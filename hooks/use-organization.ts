import OrganizationContext from '@/context/org-context';
import { useContext } from 'react';

const useOrganization = () => {
  const context = useContext(OrganizationContext);

  if (!context) {
    throw new Error(
      'useOrganization must be used within an OrganizationProvider'
    );
  }

  return context;
};

export default useOrganization;
