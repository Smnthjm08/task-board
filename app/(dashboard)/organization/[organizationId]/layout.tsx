import { OrgControl } from '@/components/organization/org-control';

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <OrgControl />
      <div>{children}</div>
    </div>
  );
};

export default OrganizationIdLayout;
