import OrganisationContext from '@/context/org-context';
import { useContext } from 'react';

const useOrganisation = () => {
  const context = useContext(OrganisationContext);

  if (!context) {
    throw new Error(
      'useOrganisation must be used within an OrganisationProvider'
    );
  }

  return context;
};

export default useOrganisation;
