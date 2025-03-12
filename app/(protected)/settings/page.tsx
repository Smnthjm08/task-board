import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

const SettingsPage = async () => {
  const session = await auth();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type='submit'>Sign Out</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
