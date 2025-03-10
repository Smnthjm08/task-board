import Appbar from '@/components/organization/appbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <Appbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
